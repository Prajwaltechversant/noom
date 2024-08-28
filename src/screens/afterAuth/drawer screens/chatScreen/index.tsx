import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useScreenContext } from '../../../../context/screenContext';
import styles from './style';
import ChatItem from '../../../../components/chat Components/chatItem';
import ChatBox from '../../../../components/chat Components/chat box';
import firestore, { Filter } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { admin_uid } from "@env"
import { firebase } from '@react-native-firebase/auth';
import { push } from '../../HomeScreen/dataset';




const ChatScreen: React.FC = ({ route }: any) => {
    const screenContext = useScreenContext();
    const { width, fontScale, height, isPortrait, isTabletType, scale } =
        screenContext;
    const screenStyles = styles(
        screenContext,
        isPortrait ? width : height,
        isPortrait ? height : width,
    );
    const currentUid = auth().currentUser?.uid;
    const currentEmail = auth().currentUser?.email;
    const userID = route.params?.userId
    const isAdmin = admin_uid === currentUid
    const [allMessages, SetAllMessages] = useState([])
    const chatRef = firestore().collection(`Chats`)
    const [message, setMessage] = useState<string>('')
    const listRef = useRef<FlatList>(null)
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
                        userID: currentUid,
                        email: currentEmail
                    })
                } else {
                    await chatRef.add({
                        message: message,
                        sendTime: firebase.firestore.Timestamp.now(),
                        fromId: currentUid,
                        toId: userID,
                        role: 'admin',
                    })
                }
                setMessage('')
                listRef.current?.scrollToEnd()
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
            .onSnapshot(documentSnapshot => {
                const resData: any = documentSnapshot.docs.map(i => i.data());
                const filtered = resData.sort((a: any, b: any) => a.sendTime - b.sendTime)
                SetAllMessages(filtered)
            });
        return () => subscriber();
    }, []);

    return (
        <View style={screenStyles.container}>
            <View style={screenStyles.messageContainer}>
                <FlatList
                    data={allMessages}
                    ref={listRef}
                    renderItem={({ item }) => (
                        <ChatItem item={item} currentUid={currentUid} />
                    )}
                />
            </View>
            <ChatBox setMessage={setMessage} sendMessage={sendMessage} message={message} />
        </View>
    )
}

export default ChatScreen