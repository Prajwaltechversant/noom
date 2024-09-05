import { View, Text, FlatList, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useScreenContext } from '../../../../context/screenContext';
import styles from './style';
import ChatItem from '../../../../components/chat Components/chatItem';
import ChatBox from '../../../../components/chat Components/chat box';
import firestore, { arrayUnion, Filter } from '@react-native-firebase/firestore';
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
    const [isSending, setIsSending] = useState(false)



    // function to send message
    const sendMessage = async () => {
        try {
            if (message && message.length > 0) {
                setIsSending(true)

                if (!isAdmin) {
                    const isExisting = (await firestore().collection(`Chats`).doc(currentUid).get()).exists
                    if (!isExisting) {
                        await firestore().collection(`Chats`).doc(currentUid)
                            .set({
                                messages: arrayUnion({
                                    message: message,
                                    sendTime: firebase.firestore.Timestamp.now(),
                                    fromId: currentUid,
                                    toId: admin_uid,
                                    role: 'user',
                                    userID: currentUid,
                                    email: currentEmail
                                }),
                                id: currentUid
                            });
                        setIsSending(false)
                    } else {
                        await firestore().collection(`Chats`).doc(currentUid)
                            .update({
                                messages: arrayUnion({
                                    message: message,
                                    sendTime: firebase.firestore.Timestamp.now(),
                                    fromId: currentUid,
                                    toId: admin_uid,
                                    role: 'user',
                                    userID: currentUid,
                                    email: currentEmail
                                })
                            });
                        setIsSending(false)
                    }
                } else {
                    await firestore().collection(`Chats`).doc(userID)
                        .update({
                            messages: arrayUnion({
                                message: message,
                                sendTime: firebase.firestore.Timestamp.now(),
                                fromId: currentUid,
                                toId: userID,
                                role: 'admin',
                                userID: currentUid,
                                email: currentEmail
                            })
                        });
                    setIsSending(false)
                }
                setMessage(staticVariables.EMPTY_STRING)
                listRef.current?.scrollToEnd()
            }
        } catch (error) {
            Alert.alert((error as Error).message)
        }
    }




    // listener fetch messages
    useEffect(() => {
        const subscriber = firestore()
            .collection('Chats')
            .doc(isAdmin ? userID : currentUid)
            .onSnapshot(documentSnapshot => {
                const resData: any = documentSnapshot.data()
                const filtered = resData?.messages?.sort((a: any, b: any) => a.sendTime - b.sendTime)
                SetAllMessages(filtered)
                listRef.current?.scrollToEnd()
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

                    showsVerticalScrollIndicator={false}
                />
            </View>
            <ChatBox setMessage={setMessage} sendMessage={sendMessage} message={message} isMessageSending={isSending} />
        </View>
    )
}

export default ChatScreen