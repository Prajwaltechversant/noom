import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { SVGRenderer, SkiaChart, } from '@wuba/react-native-echarts';
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import styles from './style';
import { useScreenContext } from '../../../context/screenContext';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';


echarts.use([SVGRenderer, LineChart, GridComponent]);

export default function WeighScreen() {
    const screenContext = useScreenContext();
    const { width, fontScale, height, isPortrait } = screenContext;
    const screenStyles = styles(
      screenContext,
      isPortrait ? width : height,
      isPortrait ? height : width,
    );
    const navigation: any = useNavigation();
  
    const currentUid = auth().currentUser?.uid;
    const [allData, setAllData] = useState<any[]>([])
    const [alldate, setAllDate] = useState<any[]>([])
    useEffect(() => {
        const subscriber = firestore()
            .collection(`UserData/${currentUid}/dailyProgress`)
            .where('id', '==', 'logweight')
            .onSnapshot(documentSnapshot => {
                const weigh: any[] = documentSnapshot.docs.map(i => i.data())
                console.log(weigh)
                const sorted = weigh.sort((a,b)=>a.addedDate-b.addedDate)
                const dateSet = sorted.map((i: any) => new Date(i.addedDate).getDate)
                const weightSet = sorted.map((i: any) => i.data.count)
                setAllData(weightSet)
                setAllDate(dateSet)
            });

        return () => subscriber();
    }, []);

    const skiaRef = useRef<any>(null);
    console.log(allData)
    useEffect(() => {
        const option = {
            xAxis: {
                type: 'category',
                data: [...alldate]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [...allData],
                    type: 'line',
                    smooth: true,

                }
            ]
        };
        let chart: any;
        if (skiaRef.current) {
            chart = echarts.init(skiaRef.current, 'light', {
                renderer: 'svg',
                width: 400,
                height: 400,
            });
            chart.setOption(option);
        }
        return () => chart?.dispose();
    }, [allData]);

    return (
        <View style={screenStyles.container}>
            <SkiaChart ref={skiaRef} height={height} width={width}  />
        </View>
       
    );
}