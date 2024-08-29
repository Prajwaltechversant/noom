import { View, Text, SectionList, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style';
import { useScreenContext } from '../../../../context/screenContext';
import auth, { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import textStyle from '../../../../style/text/style';
import { Divider } from 'react-native-paper';

const DailyProgress = () => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait, isTabletType, scale } =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const currentUid = auth().currentUser?.uid;
  const [dailyProgressData, setDailyProgressData] = useState<any>([])
  const DATA = [
    {
      title: 'Main dishes',
      data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
      title: 'Sides',
      data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
      title: 'Drinks',
      data: ['Water', 'Coke', 'Beer'],
    },
    {
      title: 'Desserts',
      data: ['Cheese Cake', 'Ice Cream'],
    },
  ];


  const addDate = (timeStamp: any) => {
    try {
      const ref = new Date(timeStamp.toDate())
      const date = `${ref.getDay()}${ref.getMonth()}${ref.getFullYear()}`
      return date
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const startOfDay = new Date(
      new Date().setHours(0, 0, 0, 0),
    );
    const endOfDay = new Date(
      new Date().setHours(23, 59, 59, 999),
    );
    firestore()
      .collection(`UserData/${currentUid}/dailyProgress`)
      .orderBy('addedDate', 'desc')
      // .where(
      //   'addedDate',
      //   '>=',
      //   firebase.firestore.Timestamp.fromDate(startOfDay),
      // )
      // .where(
      //   'addedDate',
      //   '<=',
      //   firebase.firestore.Timestamp.fromDate(endOfDay),
      // )
      .get()
      .then(i => {
        const resData = i.docs.map(item => item.data())
        const temp = [...resData]

        // const result = Array.prototype.
        // console.log(result)   
         }
      )
  }, [])

  return (
    <View style={screenStyles.container}>
      <FlatList

        data={Array(5)}
        renderItem={({ item, index }) => (
          <View style={screenStyles.cardContainer}>
            <View style={screenStyles.cardHeader}>
              <Text style={textStyle.labelText}>Date</Text>
            </View>
            <Divider style={{ width: '100%' }} />
            <View>
              <Text style={textStyle.labelText}>Date</Text>
            </View>
            <Divider />
            <View>
              <Text style={textStyle.labelText}>Date</Text>
            </View>
            <Divider />

          </View>
        )}

        showsVerticalScrollIndicator={false}

      />
    </View>
  )
}

export default DailyProgress