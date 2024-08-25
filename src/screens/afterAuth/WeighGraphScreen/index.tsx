import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { SvgChart, SVGRenderer } from '@wuba/react-native-echarts';
import * as echarts from 'echarts/core';
import { useRef, useEffect, useState } from 'react';
import {
    LineChart
} from 'echarts/charts';
import {
    TitleComponent,
    GridComponent,
    LegendComponent,
    TooltipComponent,
    DataZoomComponent,
} from 'echarts/components';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import styles from './style';
import { useScreenContext } from '../../../context/screenContext';
import textStyle from '../../../style/text/style';

echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    SVGRenderer,
    LineChart,
    LegendComponent,
    DataZoomComponent,
]);

function ChartComponent({ option }: { option: any }) {
    const screenContext = useScreenContext();
    const { width, height, isPortrait } = screenContext;
    const screenStyles = styles(
        screenContext,
        isPortrait ? width : height,
        isPortrait ? height : width,
    );
    const chartRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let chart: echarts.ECharts | null = null;
        if (chartRef.current) {
            chart = echarts.init(chartRef.current, 'light', {
                renderer: 'svg',
                width: width,
                height: height * 0.8,
            });
            chart.setOption(option);
        }
        return () => chart?.dispose();
    }, [option, width, height]);

    return <ScrollView horizontal><SvgChart ref={chartRef} /></ScrollView>;
}

export default function WeighScreen() {
    const screenContext = useScreenContext();
    const { width, height, isPortrait } = screenContext;
    const screenStyles = styles(
        screenContext,
        isPortrait ? width : height,
        isPortrait ? height : width,
    );
    const currentUid = auth().currentUser?.uid;
    const [allData, setAllData] = useState<number[]>([]);
    const [alldate, setAllDate] = useState<string[]>([]);
    const [weight, setWeight] = useState<number>(0);
    const [weightGoal, setWeightGoal] = useState<number>(0);

    useEffect(() => {
        const subscriber = firestore()
            .collection(`UserData/${currentUid}/dailyProgress`)
            .where('id', '==', 'logweight')
            .onSnapshot(snapshot => {
                const weigh = snapshot.docs.map(doc => doc.data());
                const sorted = weigh.sort((a, b) => a.addedDate.toDate().getTime() - b.addedDate.toDate().getTime());
                const dateSet = sorted.map((item: any) => item.addedDate.toDate().toDateString());
                const weightSet = sorted.map((item: any) => item.data.count);

                if (weight !== 0 && weightSet.length > 0 && weightSet[0] !== weight) {
                    setAllData([weight, ...weightSet]);
                    setAllDate([new Date().toDateString(), ...dateSet]); 
                } else {
                    setAllData(weightSet);
                    setAllDate(dateSet);
                }
            });

        return () => subscriber();
    }, [currentUid, weight]);

    useEffect(() => {
        fetchWeightDetails();
    }, []);

    const fetchWeightDetails = async () => {
        try {
            const snapshot = await firestore().collection(`UserData/${currentUid}/survey`).get();
            const data = snapshot.docs.map(doc => doc.data());
            setWeight(data[0]?.weight || 0);
            setWeightGoal(data[0]?.weightGoal || 0);
        } catch (error) {
            console.error(error);
        }
    };

    const option = {
        title: {
            text: '',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985',
                },
            },
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: alldate,
        },
        yAxis: {
            type: 'value',
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100,
            },
            {
                start: 0,
                end: 100,
            },
        ],
        series: [
            {
                name: 'Weight',
                type: 'line',
                smooth: true,
                data: allData,
            },
        ],
    };

    return (
        <View style={screenStyles.container}>
            <View style={screenStyles.tittleContainer}>
                <View style={screenStyles.textContainer}>
                    <Text style={textStyle.labelText}>Your Weight</Text>
                    <View style={screenStyles.weightCircle}>
                        <Text style={screenStyles.weightText}>{weight}</Text>
                    </View>
                </View>
                <View style={screenStyles.textContainer}>
                    <Text style={textStyle.labelText}>Your Goal</Text>
                    <View style={screenStyles.weightCircle}>
                        <Text style={screenStyles.weightText}>{weightGoal}</Text>
                    </View>
                </View>
            </View>
            <ChartComponent option={option} />
        </View>
    );
}
