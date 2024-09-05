import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import React, { useRef, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Text } from 'react-native-paper';
import { Alert, BackHandler, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useScreenContext } from '../../../context/screenContext';
import textStyle from '../../../style/text/style';
import { colorPalette } from '../../../assets/colorpalette/colorPalette';
import CustomComponentModal from '../../../components/modal/customComponentModal';
import CustomScale from '../../../components/scale';
import CustomButton from '../../../components/button/customButton';
import { addToDailyProgress2 } from '../../../services/dailyprogress';
import ActivityLoader from '../../../components/ActivityLoader';
import { staticVariables } from '../../../preferences/staticVariable';
import ChartComponent from '../../../module/echart/echartForWeightGraph';
import styles from './style';





export default function WeighScreen() {

    const screenContext = useScreenContext();
    const { width, height, isPortrait } = screenContext;
    const screenStyles = styles(
        screenContext,
        isPortrait ? width : height,
        isPortrait ? height : width,
    );
    const currentUid = auth().currentUser?.uid;
    const [allData, setAllData] = useState<number[]>(staticVariables.EMPTY_ARRAY);
    const [alldate, setAllDate] = useState<string[]>(staticVariables.EMPTY_ARRAY);
    const [weight, setWeight] = useState<number>(0);
    const [weightGoal, setWeightGoal] = useState<number>(0);
    const navigation = useNavigation()
    const [visible, setVisible] = useState(false)
    const [selectedValue, setSelctedvalue] = useState(0)
    const [isLoading, setIsLoading] = useState(true)


    // function to fetch current and idealweight of user from db
    const fetchWeightDetails = async () => {
        try {
            const snapshot = await firestore().collection(`UserData/${currentUid}/survey`).get();
            const data = snapshot.docs.map(doc => doc.data());
            setWeight(data[0]?.userWeight || 0);
            setWeightGoal(data[0]?.idealWeight || 0);
        } catch (error) {
            // Alert.alert((error as Error).message)
        }
    };
    useEffect(() => { fetchWeightDetails() }, [])




    //listener to fetch weight details

    useEffect(() => {
        const subscriber = firestore()
            .collection(`UserData/${currentUid}/dailyProgress`)
            .where('id', '==', 'logweight')
            .onSnapshot(snapshot => {
                const weigh = snapshot.docs.map(doc => doc.data());
                const sorted = weigh.sort((a, b) => a.addedDate.toDate().getTime() - b.addedDate.toDate().getTime());
                const dateSet = sorted.map((item: any) => item.addedDate.toDate().toDateString());
                const weightSet = sorted.map((item: any) => item.data.count);
                if (weightSet.length < 1) {
                    Alert.alert("Please Log Weight to see the graph")
                }
                if (weight !== 0 && weightSet.length > 0 && weightSet[0] !== weight) {
                    setAllData([weight, ...weightSet]);
                    setAllDate(['first', ...dateSet]);

                } else {
                    setAllData(weightSet);
                    setAllDate(dateSet);
                }
            });
        setIsLoading(false)
        return () => subscriber();

    }, [weight, weightGoal]);



    //fucntion to add weight
    const addWeight = async () => {
        try {
            const ref = await firestore().collection('dailyProgress')
                .where('id', '==', 'logweight')
                .get()
            const docs = ref.docs.map(i => i.data())
            await addToDailyProgress2(docs[0], selectedValue)
            setVisible(!visible)
            setSelctedvalue(0)
        } catch (error) {
            Alert.alert((error as Error).message)
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



    //backhandler
    useFocusEffect(
        React.useCallback(() => {
            const backAction = () => {
                Alert.alert('Hold on!', 'Are you sure you want to go back?', [
                    {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel',
                    },
                    { text: 'YES', onPress: () => BackHandler.exitApp() },
                ]);
                return true;
            };
            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction,
            );

            return () => backHandler.remove();
        }, [])
    );


    const option = {
        title: {
            text: staticVariables.EMPTY_STRING,
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



    if (isLoading) return <ActivityLoader style={StyleSheet.absoluteFill} />
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
