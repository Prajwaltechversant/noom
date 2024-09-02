import { View, Text, FlatList, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useScreenContext } from '../../../../context/screenContext';
import styles from './style';
import ChatItem from '../../../../components/chat Components/chatItem';
import ChatBox from '../../../../components/chat Components/chat box';
import firestore, { Filter } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { admin_uid } from "@env"
import { firebase } from '@react-native-firebase/auth';
import { staticVariables } from '../../../../preferences/staticVariable';




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
    const [allMessages, SetAllMessages] = useState(staticVariables.EMPTY_ARRAY)
    const chatRef = firestore().collection(`Chats`)
    const [message, setMessage] = useState<string>(staticVariables.EMPTY_STRING)
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
                setMessage(staticVariables.EMPTY_STRING)
                listRef.current?.scrollToEnd()
            }
        } catch (error) {
            Alert.alert((error as Error).message)
        }
    }
    useEffect(() => {
        const subscriber = firestore()
            .collection('Chats')
            .where(Filter.or(
                Filter('fromId', '==', userID ? userID : currentUid),
                Filter('toId', '==', userID ? userID : currentUid)
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