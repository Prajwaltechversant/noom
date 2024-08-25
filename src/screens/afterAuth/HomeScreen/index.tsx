import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import textStyle from '../../../style/text/style';
import DayItem from '../../../components/HomScreen components/dayItemComponent';
import { useScreenContext } from '../../../context/screenContext';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import CourseItem from '../../../components/HomScreen components/course box';
import { Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import DailyCourse, { addDailyStatus } from '../../../redux/slices/DailyCourse';
import Loader from '../../../components/Loader';
import AddProgressModal from '../../../components/modal/customModal';
import AddProgressItemComponent from '../../../components/HomScreen components/addProgressItem';
import TodaysProgress from '../../../components/HomScreen components/TodaysProgress';

const Home: React.FC = () => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait } = screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation = useNavigation();
  const currentUid = auth().currentUser?.uid;
  const dispatch = useAppDispatch();
  const locale = 'en-US';
  const [modalVisible, setModalVisible] = useState(false);
  const [weekdays, setWeekdays] = useState<string[]>([]);
  const [selctedDate, setSelctedDate] = useState<string>('');
  const [todaysCourse, setTodaysCourse] = useState<any[]>([]);
  const [selctedTimestamp, setSelctedTimeStamp] = useState(
    firebase.firestore.Timestamp.fromDate(new Date())
  );
  const [dayText, setDayText] = useState<string>('Today');
  const [isSelected, setIsSelected] = useState(false);
  const [isPrev, setIsPrev] = useState(false);
  const isFirst = useAppSelector(state => state.dailyStatus.isFirstTime);
  const [isLoading, setIsLoading] = useState(false);
  const [progressModalVisible, setProgressModalVisible] = useState(false);
  const [dailyProgressData, setDailyProgressData] = useState<any[]>([]);

  useEffect(() => {
    const weekdays: string[] = [];
    let date = new Date();
    for (let i = 0; i < 7; i++) {
      weekdays.push(date.toLocaleString(locale, { weekday: 'long' }));
      date.setDate(date.getDate() + 1);
    }
    setWeekdays(weekdays);
    setSelctedDate(weekdays[new Date().getDay()]);
  }, [locale]);

  const handleSelectedTimeStamp = () => {
    try {
      const todayIndex = weekdays.indexOf(weekdays[new Date().getDay()]);
      const selctedDateIndex = weekdays.indexOf(selctedDate);
      if (selctedDateIndex <= todayIndex) {
        setIsPrev(true);
        const newDate = new Date();
        newDate.setDate(
          newDate.getDate() - Math.abs(todayIndex - selctedDateIndex)
        );
        setSelctedTimeStamp(firebase.firestore.Timestamp.fromDate(newDate));
        setDayText(selctedDate === weekdays[new Date().getDay()] ? 'Today' : selctedDate);
        setIsSelected(!isSelected);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getRandomItems = (array:any, n:number) => {
    if (array.length <= n) {
      return array.slice();
    }
    
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };
  useEffect(() => {
    const fetchAndAddCourses = async () => {
      setIsLoading(true);
      try {
        const existingCoursesSnapshot = await firestore()
          .collection(`UserData/${currentUid}/dailyCourse`)
          .get();
        const existingCoursesArray = existingCoursesSnapshot.docs.map(doc => doc.data().id);
        
        const coursesSnapshot = await firestore().collection('courses').get();
        const courses = coursesSnapshot.docs.map(doc => doc.data());
        const availableCourses = courses.filter(course => !existingCoursesArray.includes(course.id));
  
        if (selctedDate === weekdays[new Date().getDay()] && availableCourses.length > 0) {
          const todayStart = new Date().setHours(0, 0, 0, 0);
  
          if (Number(isFirst) < Number(todayStart)) {
            const randomCourses = getRandomItems(availableCourses, 3);
            const batch = firestore().batch();
  
            randomCourses.forEach((course:any) => {
              const docRef = firestore()
                .collection(`UserData/${currentUid}/dailyCourse`)
                .doc(course.id);
  
              batch.set(docRef, {
                ...course,
                isCompleted: false,
                addedDate: firebase.firestore.Timestamp.now(),
              });
            });
  
            await batch.commit();
            dispatch(addDailyStatus(todayStart));
          }
        }
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchAndAddCourses();
  }, [selctedDate, weekdays, currentUid, isFirst, dispatch]);

  useEffect(() => {
    const fetchTodaysCourses = async () => {
      try {
        const startOfDay = new Date(selctedTimestamp.toDate().setHours(0, 0, 0, 0));
        const endOfDay = new Date(selctedTimestamp.toDate().setHours(23, 59, 59, 999));
        const snapshot = await firestore()
          .collection(`UserData/${currentUid}/dailyCourse`)
          .where('addedDate', '>=', firebase.firestore.Timestamp.fromDate(startOfDay))
          .where('addedDate', '<=', firebase.firestore.Timestamp.fromDate(endOfDay))
          .get();
        const courses = snapshot.docs.map(doc => doc.data());
        setTodaysCourse(courses);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchTodaysCourses();

    const startOfDay = new Date(selctedTimestamp.toDate().setHours(0, 0, 0, 0));
    const endOfDay = new Date(selctedTimestamp.toDate().setHours(23, 59, 59, 999));
    const subscriber = firestore()
      .collection(`UserData/${currentUid}/dailyCourse`)
      .where('addedDate', '>=', firebase.firestore.Timestamp.fromDate(startOfDay))
      .where('addedDate', '<=', firebase.firestore.Timestamp.fromDate(endOfDay))
      .onSnapshot(snapshot => {
        const updatedCourses = snapshot.docs.map(doc => doc.data());
        setTodaysCourse(updatedCourses);
      });

    return () => subscriber();
  }, [selctedTimestamp, currentUid]);

  const handleDailyProgressModal = async () => {
    try {
      const snapshot = await firestore().collection('dailyProgress').get();
      const progressData = snapshot.docs.map(doc => doc.data());
      setDailyProgressData(progressData);
      setProgressModalVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.headerContainer}>
        <FlatList
          data={weekdays}
          renderItem={({ item }) => (
            <DayItem
              day={item}
              isSelected={selctedDate === item}
              setSelctedDate={setSelctedDate}
              handleSelectedTimeStamp={handleSelectedTimeStamp}
            />
          )}
          keyExtractor={(item) => item}
          horizontal
        />
      </View>
      <View style={screenStyles.contentContainer}>
        <View style={screenStyles.headerTextContainer}>
          <Text style={[textStyle.questionText, { textAlign: 'left' }]}>
            {dayText}'s course
          </Text>
          <View style={screenStyles.dayContainer}>
            <Text style={[textStyle.labelText, { textAlign: 'right' }]}>
              Noom 10
            </Text>
          </View>
        </View>
        <FlatList
          data={todaysCourse}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CourseItem item={item} isArticle={false} />}
          ListEmptyComponent={<Loader />}
        />

        {weekdays[new Date().getDay()] === selctedDate && <TodaysProgress />}
      </View>

      <View style={screenStyles.footerBtn}>
        <Button
          icon="plus"
          style={screenStyles.btn}
          onPress={handleDailyProgressModal}
        >
          Track More Progress
        </Button>
      </View>

      <AddProgressModal visible={progressModalVisible} setProgressModalVisible={setProgressModalVisible}>
        <FlatList
          data={dailyProgressData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AddProgressItemComponent key={item.id} item={item} setProgressModalVisible={setProgressModalVisible} />
          )}
        />
      </AddProgressModal>
    </View>
  );
};

export default Home;
