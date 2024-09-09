import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useScreenContext } from '../../../context/screenContext';
import textStyle from '../../../style/text/style';
import styles from './style';
import { Timestamp } from '@react-native-firebase/firestore';


interface Props {
    item: any,
    currentUid: string | undefined


}
const ChatItem: React.FC<Props> = ({ item, currentUid }) => {
    const screenContext = useScreenContext();
    const { width, fontScale, height, isPortrait, isTabletType, scale } =
        screenContext;
    const screenStyles = styles(
        screenContext,
        isPortrait ? width : height,
        isPortrait ? height : width,
    );


    const [weekDays, setWeekDays] = useState<any>()
    useEffect(() => {
        const locale = 'en-US';
        const date = new Date();
        const weekdays: any = [];
        while (!weekdays[date.getDay()]) {
            weekdays[date.getDay()] = date
                .toLocaleString(locale, { weekday: 'long' })
                .slice(0, 3);
            date.setDate(date.getDate() + 1);
        }
        setWeekDays(weekdays);

    }, []);


    function formatTime(timestamp: any) {
        try {
            const today = new Date().setHours(0, 0, 0, 0);
            const sendTime = new Date(timestamp?.toDate().setHours(0, 0, 0, 0)) as Date;
            let newDate = new Date(timestamp * 1000) as Date;
            let Hours = newDate.getHours()
            let Minutes = newDate.getMinutes()
            let dayIndex = sendTime.getDay()
            const day = weekDays[dayIndex] + ' ' + sendTime.getDate() + '/' + sendTime.getMonth() + '/' + sendTime.getFullYear()
            const HourComplete = Number(sendTime) && Number(today) && Number(sendTime) < Number(today) ? day : 'Today ' + Hours + ':' + Minutes
            return HourComplete.toString()
        } catch (error) {
        }
    }
    return (

        <>
            <View style={[screenStyles.container, {
                backgroundColor: item.fromId === currentUid ? '#128C7E' : '#075E51',
                alignSelf: item.fromId === currentUid ? 'flex-end' : 'flex-start',
            }]}>
                <Text style={[textStyle.labelText,
                {
                    textAlign: item.role === 'admin' ? 'left' : 'right',
                    color: 'white'
                }
                ]}>{item.message}</Text>

            </View>
            <View style={[{
                alignSelf: item.fromId === currentUid ? 'flex-end' : 'flex-start',
            }]}>
                <Text style={[,
                    {
                        textAlign: item.role === 'admin' ? 'left' : 'right',
                        color: 'gray'
                        , fontSize: isPortrait ? width * 0.015 : height * 0.015
                    }
                ]}>{formatTime(item.sendTime)}</Text>

            </View>

        </>
    )
}

export default ChatItem