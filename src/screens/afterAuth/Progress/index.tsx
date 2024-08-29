import { View, Text, SectionList, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style';
import { useScreenContext } from '../../../context/screenContext';
import auth, { firebase } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import textStyle from '../../../style/text/style';
import { Divider } from 'react-native-paper';
import { dailCourseStatus } from '../../../redux/slices/DailyCourse';
import Loader from '../../../components/Loader';

const DailyProgress = ({ route }: any) => {
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
  const data = route.params.item
  const [unit, setUnit] = useState('')



  useEffect(() => {
    firestore().collection('dailyProgress').where('id', '==', data[0].id)
      .get().then(i => {
        const res = i.docs.map(item => item.data())
        setUnit(res[0]?.level?.unit ? res[0]?.level?.unit : 'item')
      })

  }, [])
  return (
    <View style={screenStyles.container}>
      <Text style={textStyle.headingText}>{data[0].title}</Text>
      <Text style={[textStyle.labelText, { textAlign: 'center' }]}>
        {data.length > 1 ? `You have Logged ${data.length}  Today` : ''}
      </Text>

      <FlatList
        data={data}
        contentContainerStyle={{ padding: 50 }}
        renderItem={({ item, index }) => {
          return (
            <View style={screenStyles.card}
            >
              <View style={screenStyles.cardHeader} >
                <Image source={{ uri: item.data.image ? item.data.image : item.image }} width={50} height={50} />
                <Text style={textStyle.labelText}>
                  {item.data.count + ' ' + unit}
                </Text>
              </View>
              <View style={screenStyles.cardFooter}>
              </View>
            </View>
          )

        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}

      />
    </View>
    // <Loader/>
  )
}

export default DailyProgress