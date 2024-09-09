import { arrayUnion } from '@react-native-firebase/firestore'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Alert } from 'react-native'
import { GiftedChat, GiftedChatProps, IMessage, Send, SendProps } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import { admin_uid } from "@env"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function ChatScreen({ route }: any) {


  const [allRequest, setAllRequest] = useState<IMessage[]>([])
  const currentUid = auth().currentUser?.uid;
  const currentEmail = auth().currentUser?.email;
  const userID = route.params?.userId
  const isAdmin = admin_uid === currentUid;
  const chatRef = useRef<any>(null)

  const onSend = useCallback((messages = []) => {
    let newMsg: IMessage = messages[0]
    let formatted = {
      ...newMsg,
      createdAt: Date.now()
    }
    sendMessage(formatted)
    // chatRef.current.scrollToBottom()
  }, [])

  useEffect(() => {
    const subscriber = firestore()
      .collection('Chats')
      .doc(isAdmin ? userID : currentUid)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          const resData: any = documentSnapshot.data()
          const filtered = resData?.messages?.sort((a: any, b: any) => a.createdAt - b.createdAt)
          setAllRequest(filtered)
        }
      });
    return () => {
      subscriber()
    };
  }, []);


  const sendMessage = async (message: any) => {
    try {
      if (!isAdmin) {
        const isExisting = (await firestore().collection(`Chats`).doc(currentUid).get()).exists
        if (!isExisting) {
          await firestore().collection(`Chats`).doc(currentUid)
            .set({
              messages: arrayUnion(
                message
              ),
            });
        } else {
          await firestore().collection(`Chats`).doc(currentUid)
            .update({
              messages: arrayUnion(
                message
              )
            });
        }
      } else {
        await firestore().collection(`Chats`).doc(userID)
          .update({
            messages: arrayUnion(message
            )
          });
      }
    } catch (error) {
      Alert.alert((error as Error).message)
    }
  }

  const renderSend = useCallback((props: SendProps<IMessage>) => {
    return (
      <Send {...props} containerStyle={{ justifyContent: 'center', paddingHorizontal: 10 }}>
        <MaterialIcons size={30} color={'send'} name={'send'} />
      </Send>
    )
  }, [])

  return (
    <GiftedChat
      messageContainerRef={chatRef}
      messages={allRequest}
      onSend={messages => onSend(messages as never)}
      user={{
        _id: currentUid as string,
      }}
      inverted={false}
      renderSend={renderSend}
      renderAvatar={null}
      scrollToBottom
      infiniteScroll

    />
  )
}   