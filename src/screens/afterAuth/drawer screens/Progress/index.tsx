import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import { useScreenContext } from '../../../../context/screenContext';
import styles from './style';
import textStyle from '../../../../style/text/style';
import NoDataComponent from '../../../../components/noDataComponent';
const FlowChart = () => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait, isTabletType, scale } =
    screenContext;

  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const currentUid = auth().currentUser?.uid;
  const [allData, setAllData] = useState([])

  useEffect(() => {
    const subscriber = firestore()
      .collection(`UserData/${currentUid}/dailyCourse`)
      .where('isCompleted', '==', true)
      .onSnapshot(documentSnapshot => {
        const resData: any = documentSnapshot.docs.map(i => i.data().title);
        // console.log(resData[0].title,'qds')
        setAllData(resData)
      });
    return () => subscriber();
  }, []);


  if (allData.length <= 0) return <NoDataComponent />

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', }} style={screenStyles.container}>
      <Svg height={allData.length * 150} width="300">
        {allData.map((item, index) => {
          const isEven = index % 2 === 0;
          const startX = isEven ? width * .13 : width * .6;  //50-250
          const endX = isEven ? width * .64 : width * .13;
          const controlX1 = isEven ? 0 : width * .39;
          const controlX2 = isEven ? width * .64 : width * .39;
          const startY = index * width * .26;
          const endY = startY + width * .26;//100..

          return (
            <View key={index}>
              <Path
                d={`M${startX} ${startY} C${controlX1} ${startY + width * .51}, ${controlX2} ${endY - width * .26}, ${endX} ${endY}`}
                // d={`M 128 0  168 80 L 256 93 L 192 155 L 207 244 L 128 202 L 49 244 L 64 155 L 0 93 L 88 80 L 128 0 Z`}
                stroke="lightblue"
                strokeWidth="9"
                fill="none"
              // d={`M10 10 Q10 100 100 100 T200 200 `}

              />
              <Path
                stroke="lightblue"
                strokeWidth="4"
                fill="none"
              />
              <Circle cx={startX} cy={startY} r="20" fill="lightblue" stroke={'green'} />
            </View>
          );
        })}
      </Svg>

      {allData.map((item, index) => {
        const isEven = index % 2 === 0;
        return (
          <View
            key={index}
            style={{
              position: 'absolute',
              top: index * width * .26 + 10,
              left: isEven ? width * .26 : 0,
              right: isEven ? 0 : width * .26,
              alignItems: isEven ? 'flex-start' : 'flex-end',
            }}
          >
            <Text style={textStyle.labelText}>{item}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default FlowChart;
