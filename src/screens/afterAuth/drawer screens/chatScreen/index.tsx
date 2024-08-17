import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useScreenContext } from '../../../../context/screenContext';
import styles from './style';
import ChatItem from '../../../../components/chat Components/chatItem';
import ChatBox from '../../../../components/chat Components/chat box';


const ChatScreen: React.FC = () => {
    const screenContext = useScreenContext();
    const { width, fontScale, height, isPortrait, isTabletType, scale } =
        screenContext;
    const screenStyles = styles(
        screenContext,
        isPortrait ? width : height,
        isPortrait ? height : width,
    );

    const arr = [
        {
            'role': 'admin', msg: 'dDDDD'
        },
        {
            'role': 'user', msg: 'dDDDD'
        },
        {
            'role': 'admin', msg: 'dDDDD'
        }, {
            'role': 'user', msg: 'dDDDD'
        },
        {
            'role': 'admin', msg: 'dDDDD'
        },
        {
            'role': 'user', msg: 'dDDDD'
        },
        {
            'role': 'admin', msg: 'dDDDD'
        }, {
            'role': 'user', msg: 'dDDDD'
        },
        {
            'role': 'admin', msg: 'dDDDD'
        },
        {
            'role': 'user', msg: 'dDDDD'
        },
        {
            'role': 'admin', msg: 'dDDDD'
        }, {
            'role': 'user', msg: 'dDDDD'
        },
        {
            'role': 'admin', msg: 'dDDDD'
        },
        {
            'role': 'user', msg: 'dDDDD'
        },
        {
            'role': 'admin', msg: 'dDDDD'
        }, {
            'role': 'user', msg: 'dDDDD'
        },
        {
            'role': 'admin', msg: 'dDDDD'
        },
        {
            'role': 'user', msg: 'dDDDD'
        },
        {
            'role': 'admin', msg: 'dDDDD'
        }, {
            'role': 'user', msg: 'dDDDD'
        }
    ]
    return (
        <View style={screenStyles.container}>
            <View style={screenStyles.messageContainer}>

                <FlatList
                    data={arr}

                    renderItem={({ item }) => (
                        <ChatItem item={item} />
                    )}
                />

            </View>

            <ChatBox />
        </View>
    )
}

export default ChatScreen