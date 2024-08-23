
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth'
import { SvgChart, SVGRenderer } from '@wuba/react-native-echarts';
import * as echarts from 'echarts/core';
import { useRef, useEffect, useState } from 'react';
import {
    BarChart,
    LineChart
} from 'echarts/charts';
import {
    TitleComponent,
    GridComponent,
    LegendComponent,
    TooltipComponent,
    DataZoomComponent,
} from 'echarts/components';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { useScreenContext } from '../../../context/screenContext';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import textStyle from '../../../style/text/style';

echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    SVGRenderer,
    LineChart,
    LegendComponent,
    DataZoomComponent,



])


function ChartComponent({ option }: any) {
    const screenContext = useScreenContext();

    const { width, fontScale, height, isPortrait, isTabletType, scale } =
        screenContext;
    const screenStyles = styles(
        screenContext,
        isPortrait ? width : height,
        isPortrait ? height : width,
    );
    const chartRef = useRef<any>(null);
    useEffect(() => {
        let chart: any;
        if (chartRef.current) {
            chart = echarts.init(chartRef.current, 'light', {
                renderer: 'svg',
                width: width,
                height: height * .8,

            });
            chart.setOption(option);
        }
        return () => chart?.dispose();
    }, [option]);
    return <ScrollView horizontal><SvgChart ref={chartRef} /></ScrollView>;
}

export default function WeighScreen() {
    const screenContext = useScreenContext();
    const { width, fontScale, height, isPortrait, isTabletType, scale } =
        screenContext;
    const screenStyles = styles(
        screenContext,
        isPortrait ? width : height,
        isPortrait ? height : width,
    );
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
                const sorted = weigh.sort((a, b) => a.addedDate - b.addedDate)
                const dateSet = sorted.map((i: any) => i.addedDate.toDate().toDateString())
                const weightSet = sorted.map((i: any) => i.data.count)
                setAllData(weightSet)
                setAllDate(dateSet)
            });
        return () => subscriber();
    }, []);
    const navigation = useNavigation();
    const skiaRef = useRef<any>(null);

    const [weight, setWeight] = useState(0)
    const [weightGoal, setWeightGoal] = useState(0)

    const option = {
        title: {
            text: '',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: 'red',
                },
            },
        },
        toolbox: {
            feature: {
                //   saveAsImage: {}
            },
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: [...alldate],

            },
        ],
        yAxis: [
            {
                type: 'value',

            },
        ],
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100
            },
            {
                start: 0,
                end: 100
            }
        ],
        series: [
            {
                type: 'line',
                smooth: true,
                data: [...allData],



            },

        ],
    };

    useEffect(() => { fetchWeightDetails() }, [])
    const fetchWeightDetails = () => {
        try {
            firestore().collection(`UserData/${currentUid}/survey`).get().then(i => {
                const data = i.docs.map(item => item.data())
                setWeight(data[0].weight)
                setWeightGoal(data[0].weightGoal)
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View style={screenStyles.container}>
            <View style={screenStyles.tittleContainer}>
                <View style={screenStyles.textContainer}>
                    <Text style={textStyle.labelText}>
                        Your Weight
                    </Text>
                    <View style={screenStyles.weightCircle}>
                        <Text style={screenStyles.weightText}>{weight}</Text>
                    </View>
                </View>
                <View style={screenStyles.textContainer}>
                    <Text style={textStyle.labelText}>
                        Your Goal
                    </Text>
                    <View style={screenStyles.weightCircle}>
                        <Text style={screenStyles.weightText}>{weightGoal}</Text>
                    </View>
                </View>
            </View>
            <ChartComponent option={option} />
        </View>
    )
}