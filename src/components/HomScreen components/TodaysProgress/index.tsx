import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import textStyle from '../../../style/text/style';
import { useScreenContext } from '../../../context/screenContext';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import { FlatList } from 'react-native-gesture-handler';



const TodaysProgress: React.FC = () => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait } = screenContext;
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
    const startOfDay = new Date(
      new Date().setHours(0, 0, 0, 0),
    );
    const endOfDay = new Date(
      new Date().setHours(23, 59, 59, 999),
    );
    try {
      const res = await firestore()
        .collection(`UserData/${currentUid}/dailyProgress`)
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
        .onSnapshot(snapshot => {
          const resData: any = snapshot.docs.map(i => i.data());
          const group = resData.reduce((acc:any, obj:any) => {
            const value = obj.id;
            if (!acc[value]) {
              acc[value] = [];
            }
            acc[value].push(obj);
            return acc;
          }, {});
          setDailyProgressData(group);

        })

    } catch (error) {
      console.log(error);
    }
  };

  const groupedData = Object.keys(dailyProgressData).map(key => ({
    id: key,
    data: dailyProgressData[key],
  }));
console.log(groupedData[0])

  return (
    <View>
      <Text style={[textStyle.questionText, { textAlign: 'left' }]}>
        Todays Progress
      </Text>
      <FlatList
        data={groupedData}
        renderItem={({ item }) => (
          <View style={screenStyles.card}>
            <View style={screenStyles.cardHeader}>
              <Text style={screenStyles.cardTitle}>{item.data[0].title}</Text>
              <Image source={{ uri: item.data[0].image }} style={screenStyles.image} />
            </View>
            <View style={screenStyles.cardFooter}>
             {/* { <Text>{item.data.length} In Todays Progress</Text>} */}
            </View>
          </View>
        )}
        keyExtractor={item => item.id}


        ListEmptyComponent={<Text>You haven't logged</Text>}
      />
    </View>
  );
};

export default TodaysProgress;
