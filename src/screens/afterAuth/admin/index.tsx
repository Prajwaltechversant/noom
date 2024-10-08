import { View, Text, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore, { Filter } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
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
    const navigation: any = useNavigation()

    useEffect(() => {
        const subscriber = firestore()
            .collection('Chats')
            .onSnapshot(documentSnapshot => {
                const resData = documentSnapshot?.docs
                let formattedData = resData.map(i => (
                    {
                        ...i.data(),
                        uid: i.id,
                        email: i.data().messages[0].currentEmail
                    }
                ))
                setAllRequests(formattedData as never)
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
                            label={item.email
                            }
                            onPress={() => handleNavigation(item.uid)}
                            btnColor={colorPalette.salmon}
                            btnHeight={width * 0.1}
                            btnWidth={width * 0.8}
                            borderRadius={isPortrait ? width * 0.01 : height * 0.01}
                        />
                    </View>
                )}
            />
        </View>
    )
}

export default AdminScreens