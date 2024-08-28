import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import textStyle from '../../../style/text/style';
import { useScreenContext } from '../../../context/screenContext';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import { FlatList } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';


interface Props {
  // children: React.ReactElement,
  handleDailyProgressModal: () => void
}

const TodaysProgress: React.FC<Props> = ({ handleDailyProgressModal }) => {
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
          const group = resData.reduce((acc: any, obj: any) => {
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
        ListFooterComponent={<TouchableOpacity style={[screenStyles.card, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
          onPress={handleDailyProgressModal}
        >
          <Text>Track More Progress</Text>
          <AntDesign name='plus' size={width * 0.07} color={'green'} />
        </TouchableOpacity>}
        ListEmptyComponent={<Text style={textStyle.labelText}>Please add Daily Progress Data</Text>}
      />
    </View>
  );
};

export default TodaysProgress;
