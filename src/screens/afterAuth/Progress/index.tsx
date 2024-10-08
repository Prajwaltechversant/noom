import { View, Text, SectionList, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useScreenContext } from '../../../context/screenContext';
import auth, { firebase } from '@react-native-firebase/auth';
import { Divider } from 'react-native-paper';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import textStyle from '../../../style/text/style';
import { dailCourseStatus } from '../../../redux/slices/DailyCourse';
import Loader from '../../../components/Loader';
import { staticVariables } from '../../../preferences/staticVariable';
import styles from './style';

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
  const [dailyProgressData, setDailyProgressData] = useState<any>(staticVariables.EMPTY_ARRAY)
  const data = route.params.item
  const [unit, setUnit] = useState(staticVariables.EMPTY_STRING)



  useEffect(() => {
    firestore().collection('dailyProgress').where('id', '==', data[0].id)
      .get().then(i => {
        const res = i.docs.map(item => item.data())
        setUnit(res[0]?.level?.unit ? res[0]?.level?.unit : 'item')
      })

  }, [])
  let total = 0
  // const cal = data.map((i: any) => { total = total + i.data.count })
  return (
    <View style={screenStyles.container}>
      <Text style={textStyle.headingText}>{data[0].title}</Text>
      <Text style={[textStyle.labelText, { textAlign: 'center' }]}>
        {data.length > 1 ? `You have Logged ${data.length}  Today` : staticVariables.EMPTY_STRING}
      </Text>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <View style={screenStyles.card2}
          >
            <Image source={{ uri: item.data.image ? item.data.image : item.image }} style={screenStyles.cardImage2} />
            <Text style={textStyle.questionText}>{item.data.count + ' ' + unit}</Text>
          </View>
        )
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

export default DailyProgress