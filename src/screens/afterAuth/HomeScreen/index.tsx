import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import textStyle from '../../../style/text/style';
import DayItem from '../../../components/HomScreen components/dayItemComponent';
import { useScreenContext } from '../../../context/screenContext';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import CourseItem from '../../../components/HomScreen components/course box';
import CustomButton from '../../../components/button/customButton';
import { ActivityIndicator, Button } from 'react-native-paper';
import firestore, { Filter } from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import ProgressItem from '../../../components/HomScreen components/progressBox';
import auth from '@react-native-firebase/auth';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import DailyCourse, {
  addDailyStatus,
  dailCourseStatus,
} from '../../../redux/slices/DailyCourse';
import CustomComponentModal from '../../../components/modal/customComponentModal';
import PlayerModal from '../../../components/HomScreen components/playerModal';
import Loader from '../../../components/Loader';
import AddProgressModal from '../../../components/modal/customModal';
import AddProgressItemComponent from '../../../components/HomScreen components/addProgressItem';
import DailyProgressCard from '../../../components/HomScreen components/dailyProgressCard';
import TodaysProgress from '../../../components/HomScreen components/TodaysProgress';

const Home: React.FC = () => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait } = screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation: any = useNavigation();
  const currentUid = auth().currentUser?.uid;
  const dispatch = useAppDispatch();
  const locale = 'en-US';
  const date = new Date();
  const weekdays: any = [];
  const [modalVisible, setmodalVisible] = useState(false);
  while (!weekdays[date.getDay()]) {
    weekdays[date.getDay()] = date.toLocaleString(locale, { weekday: 'long' });
    date.setDate(date.getDate() + 1);
  }
  const [selctedDate, setSelctedDate] = useState(weekdays[new Date().getDay()]);
  const [todaysCourse, setTodaysCourse] = useState<any[]>([]);
  const [selctedTimestamp, setSelctedTimeStamp] = useState(
    firebase.firestore.Timestamp.fromDate(new Date()),
  );
  const [dayText, setDayText] = useState<undefined | string>('Today');
  const [isSelected, setIsSelcted] = useState(false);
  const [isPrev, setIsPrev] = useState(false);
  const isFirst = useAppSelector(state => state.dailyStatus.isFirstTime);
  const [isLoading, setIsLoading] = useState(false);
  const [progressModalVisible, setProgressModalVisible] = useState(false);
  const [dailyProgressData, setDailyProgressData] = useState([]);
  const handleSelectedTimeStamp = () => {
    try {
      let todayIndex = weekdays.indexOf(weekdays[new Date().getDay()]);
      let selctedDateIndex = weekdays.indexOf(selctedDate);
      if (selctedDateIndex <= todayIndex) {
        setIsPrev(true);
        const newDate = new Date();
        newDate.setDate(
          newDate.getDate() - Math.abs(todayIndex - selctedDateIndex),
        );
        setSelctedTimeStamp(firebase.firestore.Timestamp.fromDate(newDate));
        if (selctedDate === weekdays[date.getDay()]) {
          setDayText('Today');
        } else {
          setDayText(selctedDate);
        }
        setIsSelcted(!isSelected);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchAndAddCourses = async () => {
      setIsLoading(true);
      try {
        const coursesSnapshot = await firestore()
          .collection('courses')
          .limit(3)
          .get();
        const courses = coursesSnapshot.docs.map(doc => doc.data());
        if (selctedDate === weekdays[date.getDay()]) {
          if (courses.length > 0) {
            const todayStart = new Date().setHours(0, 0, 0, 0);
            if (Number(isFirst) < Number(todayStart)) {
              const batch = firestore().batch();
              courses.forEach(course => {
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
              setIsLoading(false);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchAndAddCourses();
  }, [selctedDate, weekdays, date, currentUid, isFirst, dispatch]);

  useEffect(() => {
    const fetchTodaysCourses = async () => {
      try {
        const startOfDay = new Date(
          selctedTimestamp.toDate().setHours(0, 0, 0, 0),
        );
        const endOfDay = new Date(
          selctedTimestamp.toDate().setHours(23, 59, 59, 999),
        );
        const snapshot = await firestore()
          .collection(`UserData/${currentUid}/dailyCourse`)
          .where(
            'addedDate',
            '>=',
            firebase.firestore.Timestamp.fromDate(startOfDay),
          )
          .where(
            'addedDate',
            '<=',
            firebase.firestore.Timestamp.fromDate(endOfDay),
          )
          .get();
        const courses = snapshot.docs.map(doc => doc.data());
        setTodaysCourse(courses);
      } catch (error) {
        console.error('Error fetching tdata', error);
      }
    };

    fetchTodaysCourses();

    const startOfDay = new Date(selctedTimestamp.toDate().setHours(0, 0, 0, 0));
    const endOfDay = new Date(
      selctedTimestamp.toDate().setHours(23, 59, 59, 999),
    );
    const subscriber = firestore()
      .collection(`UserData/${currentUid}/dailyCourse`)
      .where(
        'addedDate',
        '>=',
        firebase.firestore.Timestamp.fromDate(startOfDay),
      )
      .where('addedDate', '<=', firebase.firestore.Timestamp.fromDate(endOfDay))
      .onSnapshot(snapshot => {
        const updatedCourses = snapshot.docs.map(doc => doc.data());
        setTodaysCourse(updatedCourses);
      });

    return () => subscriber();
  }, [selctedTimestamp, currentUid]);


  const handleDailyProgressModal = async () => {
    let arr: any = [];
    try {
      firestore()
        .collection('dailyProgress')
        .get()
        .then(item => {
          item.forEach(i => arr.push(i.data()));
        })
        .finally(() => {
          setDailyProgressData(arr);
          setProgressModalVisible(!progressModalVisible);
        });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(selctedDate, weekdays[new Date().getDay()])
  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.headerContainer}>
        <FlatList
          data={weekdays}
          renderItem={({ item }) => (
            <DayItem
              day={item}
              isSelected={selctedDate === item ? true : false}
              setSelctedDate={setSelctedDate}
              handleSelectedTimeStamp={handleSelectedTimeStamp}
            />
          )}
          keyExtractor={item => Math.random().toString(36).substring(2)}
          horizontal
        />
      </View>
      <FlatList
        data={Array(1)}
        keyExtractor={item => Math.random().toString(36).substring(2)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
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
              keyExtractor={item => Math.random().toString(36).substring(2)}
              renderItem={({ item, index }) => {
                return <CourseItem item={item} />;
              }}
              ListEmptyComponent={<Loader />}
            />

            {weekdays[new Date().getDay()] === selctedDate && < TodaysProgress />}
          </View>
        )}
      />

      <View style={screenStyles.footerBtn}>
        <Button
          icon={'plus'}
          style={screenStyles.btn}
          onPress={handleDailyProgressModal}>
          Track More Progress
        </Button>
      </View>

      <AddProgressModal visible={progressModalVisible} setProgressModalVisible={setProgressModalVisible} >
        <FlatList
          data={dailyProgressData}
          renderItem={({ item }: any) => (
            <AddProgressItemComponent key={item.id} item={item} setProgressModalVisible={setProgressModalVisible} />
          )}
        />
      </AddProgressModal>
    </View>
  );
};

export default Home;
