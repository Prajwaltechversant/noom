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

const Home: React.FC = () => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait, isTabletType, scale} =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation: any = useNavigation();
  const locale = 'en-US';
  const date = new Date();
  const weekdays: any = [];
  while (!weekdays[date.getDay()]) {
    weekdays[date.getDay()] = date
      .toLocaleString(locale, {weekday: 'long'})
      .slice(0, 3);
    date.setDate(date.getDate() + 1);
  }
  const [selctedDate, setSelctedDate] = useState(weekdays[new Date().getDay()]);
  const [todaysCourse, setTodaysCourse] = useState<any>([]);

  const [selctedTimestamp, setSelctedTimeStamp] = useState(
    firebase.firestore.Timestamp.fromDate(date),
  );
  console.log(selctedTimestamp);
  const handleSelectedTimeStamp = () => {
    try {
      let todayIndex = weekdays.indexOf(weekdays[new Date().getDay()]);
      let selctedDateIndex = weekdays.indexOf(selctedDate);

      console.log(todayIndex, selctedDateIndex);

      if (selctedDateIndex <= todayIndex) {
        console.log(Math.abs(todayIndex - selctedDateIndex));
        let newTimeinSec = date.setDate(
          date.getDate() - Math.abs(todayIndex - selctedDateIndex),
        );

        setSelctedTimeStamp(
          firebase.firestore.Timestamp.fromDate(new Date(newTimeinSec)),
        );
      } else {
        console.log(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(
    selctedTimestamp.nanoseconds,
    firebase.firestore.Timestamp.fromDate(date).nanoseconds,
  );
  useEffect(() => {
    let arr: any = [];
    firestore()
      .collection('courses')
        .where('createdAt', '<=', selctedTimestamp)
      //   .where('createdAt', '<=', firebase.firestore.Timestamp.fromDate(date).nanoseconds)
    //   .where(
    //     Filter.and(
    //       Filter('createdAt', '>=', selctedTimestamp.nanoseconds),
    //       Filter(
    //         'createdAt',
    //         '<=',
    //         firebase.firestore.Timestamp.fromDate(date).nanoseconds,
    //       ),
    //     ),
    //   )
      .get()
      .then((item): any => {
        item.forEach(i => {
          console.log(i);
          arr.push(i.data());
        });
        setTodaysCourse(arr);
      });
  }, [selctedTimestamp]);
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
          horizontal
        />
      </View>
      <FlatList
        data={Array(1)}
        renderItem={({item}) => (
          <View style={screenStyles.contentContainer}>
            <Text style={[textStyle.questionText, {textAlign: 'left'}]}>
              Todays Course
            </Text>
            <FlatList
              data={todaysCourse}
              renderItem={({item, index}) => {
                // console.log(item.title, ';asas');
                return <CourseItem item={item} />;
              }}
              ListEmptyComponent={<ActivityIndicator />}
            />

            <Text style={[textStyle.questionText, {textAlign: 'left'}]}>
              Todays Progress
            </Text>
            <FlatList
              data={Array(3)}
              renderItem={({item}) => <CourseItem item={item} />}
            />
          </View>
        )}
        ListFooterComponent={
          <Button icon={'plus'} style={screenStyles.btn}>
            Track More Progress
          </Button>
        }
      />
    </View>
  );
};

export default Home;
