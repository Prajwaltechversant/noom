import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore, { Filter } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { admin_uid } from "@env"
import { firebase } from '@react-native-firebase/auth';
import { useScreenContext } from '../../../context/screenContext';
import styles from './style';
const AdminScreens: React.FC = () => {


    const screenContext = useScreenContext();
    const { width, fontScale, height, isPortrait, isTabletType, scale } =
        screenContext;
    const screenStyles = styles(
        screenContext,
        isPortrait ? width : height,
        isPortrait ? height : width,
    );
    const [allRequests, setAllRequests] = useState([])

    useEffect(() => {
        const subscriber = firestore()
            .collection('Chats')
            .where('toId', '==', admin_uid)
            .orderBy('sendTime', 'asc')
            .onSnapshot(documentSnapshot => {
                const resData: any = documentSnapshot?.docs.map(i => i.data());
                console.log(documentSnapshot)
                setAllRequests(resData)
            });

        return () => subscriber();
    }, []);

    console.log(allRequests, 'sfdg')

    return (
        <View style={screenStyles.container}>

            <FlatList
                data={allRequests}

                renderItem={({ item, index }) => (
                    <View>
                        <Text>{index}</Text>
                    </View>
                )}


            />

        </View>
    )
}

export default AdminScreens