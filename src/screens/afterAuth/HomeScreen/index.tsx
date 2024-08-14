import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import textStyle from '../../../style/text/style';
import DayItem from '../../../components/HomScreen components/dayItemComponent';
import {useScreenContext} from '../../../context/screenContext';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import CourseItem from '../../../components/HomScreen components/course box';
import CustomButton from '../../../components/button/customButton';
import {ActivityIndicator, Button} from 'react-native-paper';
import firestore, {Filter} from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';
import ProgressItem from '../../../components/HomScreen components/progressBox';
import auth from '@react-native-firebase/auth';
import {useAppDispatch, useAppSelector} from '../../../redux/hook';
import {addDailyStatus} from '../../../redux/slices/DailyCourse';
import CustomComponentModal from '../../../components/modal/customComponentModal';
import PlayerModal from '../../../components/HomScreen components/playerModal';

const Home: React.FC = () => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait} = screenContext;
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
    weekdays[date.getDay()] = date.toLocaleString(locale, {weekday: 'long'});
    // .slice(0, 3);
    date.setDate(date.getDate() + 1);
  }
  const [selctedDate, setSelctedDate] = useState(weekdays[new Date().getDay()]);
  const [todaysCourse, setTodaysCourse] = useState<any[]>([]);
  const [selctedTimestamp, setSelctedTimeStamp] = useState(
    firebase.firestore.Timestamp.fromDate(date),
  );
  const [dayText, setDayText] = useState<undefined | string>('Today');
  const [isSelected, setIsSelcted] = useState(false);
  const [isPrev, setIsPrev] = useState(false);
  const isFirst = useAppSelector(state => state.dailyStatus.isFirstTime);
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
    firestore()
      .collection('courses')
      .limit(3)
      .get()
      .then(item => {
        let arr: any = [];
        item.forEach(i => {
          arr.push(i.data());
        });
        if (selctedDate === weekdays[date.getDay()]) {
          if (arr.length > 0) {
            if (Number(isFirst) < Number(new Date().setHours(0, 0, 0, 0))) {
              arr.forEach((item: any) => {
                firestore()
                  .collection(`UserData/${currentUid}/dailyCourse`)
                  .doc(item.id)
                  .set({
                    ...item,
                    isCompleted: false,
                    addedDate: firebase.firestore.Timestamp.now(),
                  })
                  .then(item => {
                    console.log('course added');
                    dispatch(addDailyStatus(new Date().setHours(0, 0, 0, 0)));
                  });
              });
            }
          }
        }
      });
  }, []);

  useEffect(() => {
    const startOfDay = new Date(selctedTimestamp.toDate().setHours(0, 0, 0, 0));
    const endOfDay = new Date(
      selctedTimestamp.toDate().setHours(23, 59, 59, 999),
    );
    let arr: any = [];
    const subscriber = firestore()
      .collection(`UserData/${currentUid}/dailyCourse`)
      .where(
        'addedDate',
        '>=',
        firebase.firestore.Timestamp.fromDate(startOfDay),
      )
      .where('addedDate', '<=', firebase.firestore.Timestamp.fromDate(endOfDay))
      .onSnapshot(documentSnapshot => {
        documentSnapshot.forEach(item => {
          arr.push(item.data());
        }),
          setTodaysCourse(arr);
      });
    return () => subscriber();
  }, [selctedTimestamp.seconds]);

  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.headerContainer}>
        <FlatList
          data={weekdays}
          renderItem={({item}) => (
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
        renderItem={({item}) => (
          <View style={screenStyles.contentContainer}>
            <View style={screenStyles.headerTextContainer}>
              <Text style={[textStyle.questionText, {textAlign: 'left'}]}>
                {dayText}'s course
              </Text>
              <View style={screenStyles.dayContainer}>
                <Text style={[textStyle.labelText, {textAlign: 'right'}]}>
                  Noom 10
                </Text>
              </View>
            </View>
            <FlatList
              data={todaysCourse}
              keyExtractor={item => Math.random().toString(36).substring(2)}
              renderItem={({item, index}) => {
                return <CourseItem item={item} setmodalVisible={setmodalVisible} />;
              }}
              ListEmptyComponent={<ActivityIndicator />}
            />

            <Text style={[textStyle.questionText, {textAlign: 'left'}]}>
              Todays Progress
            </Text>
            <FlatList
              data={Array(3)}
              keyExtractor={item => Math.random().toString(36).substring(2)}
              renderItem={({item}) => <ProgressItem item={item} />}
            />
          </View>
        )}
      />

      <View style={screenStyles.footerBtn}>
        <Button icon={'plus'} style={screenStyles.btn}>
          Track More Progress
        </Button>
      </View>
    </View>
  );
};

export default Home;
