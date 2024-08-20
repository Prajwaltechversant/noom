import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import textStyle from '../../../style/text/style';
import {useScreenContext} from '../../../context/screenContext';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const TodaysProgress: React.FC = () => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait} = screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation: any = useNavigation();
  const currentUid = auth().currentUser?.uid;
  const [dailyProgressData, setDailyProgressData] = useState<any>([]);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const res = await firestore()
        .collection(`UserData/${currentUid}/dailyProgress`)
        .orderBy('id', 'asc')
        .get();
      const resData: any[] = await res.docs.map(i => i.data());
      const group = resData.reduce((acc, obj) => {
        const value = obj.id;
        if (!acc[value]) {
          acc[value] = [];
        }
        acc[value].push(obj);
        return acc;
      }, {});

      setDailyProgressData(group);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(dailyProgressData);
  return (
    <View>
      <Text style={[textStyle.questionText, {textAlign: 'left'}]}>
        Todays Progress
      </Text>
    </View>
  );
};

export default TodaysProgress;
