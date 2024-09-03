import { View, Text, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore, { Filter } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { admin_uid } from "@env"
import { firebase } from '@react-native-firebase/auth';
import { useScreenContext } from '../../../context/screenContext';
import CustomButton from '../../../components/button/customButton';
import { colorPalette } from '../../../assets/colorpalette/colorPalette';
import { useNavigation } from '@react-navigation/native';
import { screenNames, staticVariables } from '../../../preferences/staticVariable';
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
    const [allRequests, setAllRequests] = useState(staticVariables.EMPTY_ARRAY)
    const currentUid = auth().currentUser?.uid;
    const currentEmail = auth().currentUser?.email;
    const navigation: any = useNavigation()

    useEffect(() => {
        let arr: any = []
        const subscriber = firestore()
            .collection('Chats')
            .where('toId', '==', admin_uid)
            .onSnapshot(documentSnapshot => {
                const resData: any = documentSnapshot?.docs.map(i => i.data());
                const unique = resData.filter((obj: any, index: any) => {
                    return index === resData.findIndex((o: any) => obj.userID === o.userID);
                });
                setAllRequests(unique)
            });

        return () => subscriber();
    }, []);

    const handleNavigation = (uid: any) => {
        try {
            navigation.navigate(screenNames.Message_Screen, { userId: uid }
            );
        } catch (error) {
            Alert.alert((error as Error).message)
        }
    }


    return (
        <View style={screenStyles.container}>
            <Text >All requests</Text>

            <FlatList
                data={allRequests}

                renderItem={({ item, index }: any) => (
                    <View style={screenStyles.msgContainer}>
                        <CustomButton
                            label={item.email}
                            onPress={() => handleNavigation(item.userID)}
                            btnColor={colorPalette.salmon}
                            btnHeight={width * 0.1}
                            btnWidth={width * 0.8}
                        />
                    </View>
                )}
            />
        </View>
    )
}

export default AdminScreens