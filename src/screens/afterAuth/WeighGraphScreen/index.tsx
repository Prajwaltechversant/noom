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
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import styles from './style';
import { useScreenContext } from '../../../context/screenContext';
import textStyle from '../../../style/text/style';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { colorPalette } from '../../../assets/colorpalette/colorPalette';
import LogWeightScreen from '../addDailyProgressScreen/ProgressScreen2';
import CustomModal from '../../../components/modal/customModal';
import CustomComponentModal from '../../../components/modal/customComponentModal';
import Scale from 'echarts/types/src/scale/Scale.js';
import CustomScale from '../../../components/scale';
import CustomButton from '../../../components/button/customButton';
import { addToDailyProgress2 } from '../../../services/dailyprogress';
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
                height: screenContext.isPortrait ? height * 0.78 : height * 0.6,
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
    const navigation = useNavigation()
    const [visible, setVisible] = useState(false)
    const [selectedValue, setSelctedvalue] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [confirmWeight, setConfirmWeight] = useState(false)
    
    const fetchDailyProgressWeight = async () => {
        try {
            const res = await firestore()
                .collection(`UserData/${currentUid}/dailyProgress`)
                .where('id', '==', 'logweight')
                .get()
            const data = res.docs.map(i => i.data())
            const sorted = data.sort((a, b) => a.addedDate.toDate().getTime() - b.addedDate.toDate().getTime());
            const dateSet = sorted.map((item: any) => item.addedDate.toDate().toDateString());
            const weightSet = sorted.map((item: any) => item.data.count);
            setAllData([weight, ...weightSet]);
            setAllDate(['first', ...dateSet]);
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        // const subscriber = firestore()
        //     .collection(`UserData/${currentUid}/dailyProgress`)
        //     .where('id', '==', 'logweight')
        //     .onSnapshot(snapshot => {
        //         const weigh = snapshot.docs.map(doc => doc.data());
        //         const sorted = weigh.sort((a, b) => a.addedDate.toDate().getTime() - b.addedDate.toDate().getTime());
        //         const dateSet = sorted.map((item: any) => item.addedDate.toDate().toDateString());
        //         const weightSet = sorted.map((item: any) => item.data.count);

        //         if (weight !== 0 && weightSet.length > 0 && weightSet[0] !== weight) {
        //             setAllData([weight, ...weightSet]);
        //             setAllDate(['first', ...dateSet]);

        //         } else {
        //             setAllData(weightSet);
        //             setAllDate(dateSet);

        //         }
        //     });

        // return () => subscriber();
        fetchWeightDetails();
        fetchDailyProgressWeight()
    }, []);



    const addWeight = async () => {
        try {

            const ref = await firestore().collection('dailyProgress')
                .where('id', '==', 'logweight')
                .get()
            const docs = ref.docs.map(i => i.data())
            await addToDailyProgress2(docs[0], selectedValue)
            setVisible(!visible)
            setSelctedvalue(0)
            await fetchDailyProgressWeight()

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <TouchableOpacity style={screenStyles.headerBtn} onPress={() => setVisible(!visible)}>
                        <Text style={[textStyle.labelText, { color: colorPalette.white }]}>
                            Add
                        </Text>
                        <AntDesign name='plus' color={'white'} size={20} />
                    </TouchableOpacity>
                );
            },
        })
    }, []);

    const fetchWeightDetails = async () => {
        try {
            const snapshot = await firestore().collection(`UserData/${currentUid}/survey`).get();
            const data = snapshot.docs.map(doc => doc.data());
            setWeight(data[0]?.userWeight || 0);
            setWeightGoal(data[0]?.idealWeight || 0);
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



    if (isLoading) return <ActivityIndicator style={StyleSheet.absoluteFill} />
    return (
        <View style={screenStyles.container}>
            {/* {isLoading && <ActivityIndicator style={StyleSheet.absoluteFill} color='red' />} */}

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

            <CustomComponentModal visible={visible} modalHeight={screenContext.isPortrait ? height * .4 : height * .6} setProgressModalVisible={setVisible}>
                <CustomScale maxValue={250} minValue={0} selectedScaleValue={selectedValue} setSelectedScaleValue={setSelctedvalue} />
                <CustomButton
                    label='Save'
                    btnColor={colorPalette.mint}
                    btnWidth={screenContext.isPortrait ? width * 0.4 : width * 0.2}
                    btnHeight={screenContext.isPortrait ? height * 0.05 : width * 0.04}
                    borderRadius={20}
                    onPress={addWeight}
                    labelColor={colorPalette.black}

                />
            </CustomComponentModal>
        </View>
    );
}
