import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import textStyle from '../../../style/text/style';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import DailyCourse, { addDailyStatus } from '../../../redux/slices/DailyCourse';
import { useScreenContext } from '../../../context/screenContext';
import Loader from '../../../components/Loader';
import AddProgressModal from '../../../components/modal/customModal';
import AddProgressItemComponent from '../../../components/HomScreen components/addProgressItem';
import TodaysProgress from '../../../components/HomScreen components/TodaysProgress';
import NoDataComponent from '../../../components/noDataComponent';
import { staticVariables } from '../../../preferences/staticVariable';
import CourseItem from '../../../components/HomScreen components/course box';
import DayItem from '../../../components/HomScreen components/dayItemComponent';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import HeaderTab from '../../../components/headerTab';

const Home: React.FC = () => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait } = screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const currentUid = auth().currentUser?.uid;
  const dispatch = useAppDispatch();
  const locale = 'en-US';
  const [weekdays, setWeekdays] = useState<string[]>(staticVariables.EMPTY_ARRAY);
  const [selctedDate, setSelctedDate] = useState<string>(staticVariables.EMPTY_STRING);
  const [todaysCourse, setTodaysCourse] = useState<any[]>(staticVariables.EMPTY_ARRAY);
  const [selctedTimestamp, setSelctedTimeStamp] = useState(firebase.firestore.Timestamp.fromDate(new Date()));
  const [dayText, setDayText] = useState<string>('Today');
  const [isSelected, setIsSelected] = useState(false);
  const [isPrev, setIsPrev] = useState(false);
  const isFirst = useAppSelector(state => state.dailyStatus.isFirstTime);
  const [test, setTest] = useState(0)
  const [isLoading, setIsLoading] = useState(false);
  const [progressModalVisible, setProgressModalVisible] = useState(false);
  const [dailyProgressData, setDailyProgressData] = useState<any[]>([]);
  const [audios, setAudios] = useState([])
  const navigation = useNavigation()




  // Array of week days
  useEffect(() => {
    const locale = 'en-US';
    const date = new Date();
    const weekdays: any = [];
    while (!weekdays[date.getDay()]) {
      weekdays[date.getDay()] = date
        .toLocaleString(locale, { weekday: 'long' })
        .slice(0, 3);
      date.setDate(date.getDate() + 1);
    }
    setWeekdays(weekdays);
    setSelctedDate(weekdays[new Date().getDay()]);

  }, [locale]);







  // function to update the profile completion status of user to firebase
  const updateAuthStatus = async (todayStart: any) => {
    try {
      await firestore().collection(`UserData/${currentUid}/profileCompletionStatus`).doc(currentUid).set({
        isOnBoardingCompleted: true,
        isProfileCompleted: true,
        isFirst: todayStart
      })
    } catch (error) {
      Alert.alert((error as Error).message)
    }
  }


  useEffect(() => {
    const subscriber = firestore()
      .collection(`UserData/${currentUid}/profileCompletionStatus`)
      .doc(currentUid)
      .onSnapshot((documentSnapshot: any) => {
        let res = documentSnapshot.data().isFirst
        setTest(res)
      });
    return () => subscriber();
  }, []);



  //function to fetch todays course
  const fetchTodaysCourses = async (date: any) => {
    const startOfDay = new Date(date.toDate().setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.toDate().setHours(23, 59, 59, 999));
    const snapshot = await firestore()
      .collection(`UserData/${currentUid}/dailyCourse`)
      .where('addedDate', '>=', firebase.firestore.Timestamp.fromDate(startOfDay))
      .where('addedDate', '<=', firebase.firestore.Timestamp.fromDate(endOfDay))
      .get()
    const courses = snapshot.docs.map(doc => doc.data());
    setTodaysCourse(courses);

  };



  //function to select day
  const handleSelectedTimeStamp = async (day: string) => {
    try {
      const todayIndex = weekdays.indexOf(weekdays[new Date().getDay()]);
      const selctedDateIndex = weekdays.indexOf(day);
      if (selctedDateIndex <= todayIndex) {
        setIsPrev(true);
        const newDate = new Date();
        newDate.setDate(
          newDate.getDate() - Math.abs(todayIndex - selctedDateIndex)
        );
        setSelctedTimeStamp(firebase.firestore.Timestamp.fromDate(newDate));
        setDayText(day === weekdays[new Date().getDay()] ? 'Today' : day);
        setIsSelected(!isSelected);
        await fetchTodaysCourses(firebase.firestore.Timestamp.fromDate(newDate))
      }
    } catch (error) {
      Alert.alert((error as Error).message)
    }
  };

  // filtering of course data from firestore 
  const getRandomItems = (array: any, n: number) => {
    if (array.length <= n) {
      return array.slice();
    }
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };



  // fetch course and add to firebase at once in a day or first time user run noom
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
          if (test > 0 && Number(test) < Number(todayStart)) {
            const randomCourses = getRandomItems(availableCourses, 3);
            const batch = firestore().batch();
            randomCourses.forEach((course: any) => {
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
            updateAuthStatus(todayStart)
            dispatch(addDailyStatus(todayStart));
          }
        }
      } catch (error) {
        Alert.alert((error as Error).message)
      } finally {
        setIsLoading(false);
      }
    };
    fetchAndAddCourses();
  }, [selctedDate, weekdays, currentUid, dispatch, test]);



  // realtime listener to fetch updated data
  useEffect(() => {
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
  }, [selctedTimestamp]);


  // function to open daily progress modal
  const handleDailyProgressModal = async () => {
    try {
      const snapshot = await firestore().collection('dailyProgress').get();
      const progressData = snapshot.docs.map(doc => doc.data());
      setDailyProgressData(progressData);
      setProgressModalVisible(true);
    } catch (error) {
      Alert.alert((error as Error).message)
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
              handleSelectedTimeStamp={handleSelectedTimeStamp}
            />
          )}
          keyExtractor={(item) => item}
          horizontal
        />
      </View>
      {
        todaysCourse.length > 0 ?
          <>
            <FlatList
              data={Array(1)}
              showsVerticalScrollIndicator={false}
              renderItem={({ i }: any) => (<>
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
                  <TodaysProgress handleDailyProgressModal={handleDailyProgressModal} />
                </View>
              </>
              )}
            />

            <AddProgressModal visible={progressModalVisible} setProgressModalVisible={setProgressModalVisible}>
              <FlatList
                data={dailyProgressData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <AddProgressItemComponent key={item.id} item={item} setProgressModalVisible={setProgressModalVisible} />
                )}
              />
            </AddProgressModal>
          </>
          : <NoDataComponent />
      }
    </View>
  );
};

export default Home;
