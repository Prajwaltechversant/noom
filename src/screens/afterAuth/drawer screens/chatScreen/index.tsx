import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useScreenContext } from '../../../../context/screenContext';
import styles from './style';
import ChatItem from '../../../../components/chat Components/chatItem';
import ChatBox from '../../../../components/chat Components/chat box';
import firestore, { Filter } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { admin_uid } from "@env"
import { firebase } from '@react-native-firebase/auth';




const ChatScreen: React.FC = () => {
    const screenContext = useScreenContext();
    const { width, fontScale, height, isPortrait, isTabletType, scale } =
        screenContext;
    const screenStyles = styles(
        screenContext,
        isPortrait ? width : height,
        isPortrait ? height : width,
    );
    const currentUid = auth().currentUser?.uid;
    const isAdmin = admin_uid === currentUid

    const [allMessages, SetAllMessages] = useState([])


    console.log(admin_uid, 'asd')


    // const arr = [
    //     {
    //         'role': 'admin', msg: 'dDDDD'
    //     },
    //     {
    //         'role': 'user', msg: 'dDDDD'
    //     },
    //     {
    //         'role': 'admin', msg: 'dDDDD'
    //     }, {
    //         'role': 'user', msg: 'dDDDD'
    //     },
    //     {
    //         'role': 'admin', msg: 'dDDDD'
    //     },
    //     {
    //         'role': 'user', msg: 'dDDDD'
    //     },
    //     {
    //         'role': 'admin', msg: 'dDDDD'
    //     }, {
    //         'role': 'user', msg: 'dDDDD'
    //     },
    //     {
    //         'role': 'admin', msg: 'dDDDD'
    //     },
    //     {
    //         'role': 'user', msg: 'dDDDD'
    //     },
    //     {
    //         'role': 'admin', msg: 'dDDDD'
    //     }, {
    //         'role': 'user', msg: 'dDDDD'
    //     },
    //     {
    //         'role': 'admin', msg: 'dDDDD'
    //     },
    //     {
    //         'role': 'user', msg: 'dDDDD'
    //     },
    //     {
    //         'role': 'admin', msg: 'dDDDD'
    //     }, {
    //         'role': 'user', msg: 'dDDDD'
    //     },
    //     {
    //         'role': 'admin', msg: 'dDDDD'
    //     },
    //     {
    //         'role': 'user', msg: 'dDDDD'
    //     },
    //     {
    //         'role': 'admin', msg: 'dDDDD'
    //     }, {
    //         'role': 'user', msg: 'dDDDD'
    //     }
    // ]

    const chatRef = firestore().collection(`Chats`)

    const [message, setMessage] = useState<string>('')

    const sendMessage = async () => {
        try {

            if (message && message.length > 0) {

                if (!isAdmin) {
                    await chatRef.add({
                        message: message,
                        sendTime: firebase.firestore.Timestamp.now(),
                        fromId: currentUid,
                        toId: admin_uid,
                        role: 'user',
                        userID: currentUid
                    })
                } else {
                    await chatRef.add({
                        message: message,
                        sendTime: firebase.firestore.Timestamp.now(),
                        fromId: currentUid,
                        toId: admin_uid,
                        role: 'admin'
                    })
                }
                console.log('message send')
                setMessage('')

            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        const subscriber = firestore()
            .collection('Chats')
            .where(Filter.or(
                Filter('fromId', '==', currentUid),
                Filter('toId', '==', currentUid)

            ))
            // .orderBy('sendTime', 'asc')
            .onSnapshot(documentSnapshot => {
                // console.log(documentSnapshot,'asd')
                const resData: any = documentSnapshot.docs.map(i => i.data());
                SetAllMessages(resData)
            });

        return () => subscriber();
    }, []);

    console.log(allMessages)
    return (
        <View style={screenStyles.container}>
            <View style={screenStyles.messageContainer}>
                <FlatList
                    data={allMessages}
                    renderItem={({ item }) => (
                        <ChatItem item={item} />
                    )}

                    ListEmptyComponent={<Text>...</Text>}
                />
            </View>
            <ChatBox setMessage={setMessage} sendMessage={sendMessage} message={message} />
        </View>
    )
}

export default ChatScreen