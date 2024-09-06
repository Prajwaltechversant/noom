import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { View, Text, KeyboardAvoidingView, Alert, Image, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { useScreenContext } from '../../../context/screenContext';
import textStyle from '../../../style/text/style';
import { useAppDispatch } from '../../../redux/hook';
import CustomButton from '../../../components/button/customButton';
import { colorPalette } from '../../../assets/colorpalette/colorPalette';
import { removeData } from '../../../redux/slices/onBoardingAnswers';
import { deleteState } from '../../../redux/slices/planSlice';
import { removeSurveyProgress } from '../../../redux/slices/surveyProgressSlice/surveySlice';
import ImageSkeltonComponent from '../../../components/skeltons/imageSkelton';
import styles from './style';

type Form = {
  lname: string | undefined;
  fname: string | undefined;
  bio?: string | undefined;
};

const UserProfile = () => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait, isTabletType, scale } =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );

  const currentUid = auth().currentUser?.uid;
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const [profileData, setProfileData] = useState<any>()
  const [image, setImage] = useState<undefined | string>(undefined)
  const [loading, setLoading] = useState(true)


  // function fetch user profile image from firebase storage
  const getImageFromStorage = async () => {
    const res = await storage().ref(`Users/${currentUid}/profile`).getDownloadURL();
    setImage(res)

  }



  // to fetch userData from firestore userData db
  useEffect(() => {
    getImageFromStorage()
    const subscriber = firestore()
      .collection(`UserData/${currentUid}/profile`)
      .onSnapshot(documentSnapshot => {
        const resData = documentSnapshot.docs.map(i => i.data())
        setProfileData(resData[0])
      });

    return () => subscriber();
  }, []);


  // Backhandler
  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to go back?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, [])
  );


  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.profileContainer}>
        <View>
          <View>
            <Image source={{ uri: image ? image : 'https://th.bing.com/th/id/OIP.TctatNGs7RN-Dfc3NZf91AAAAA?rs=1&pid=ImgDetMain' }} style={screenStyles.profileImage}
              onLoad={() => setLoading(false)}
            />
          </View>
          {loading && <View style={[{ justifyContent: 'center', alignItems: 'center', position: 'absolute', }]}><ImageSkeltonComponent width={width * .3} height={width * .3} borderRadius={100} /></View>}
        </View>
        <Text style={textStyle.headingText}>{profileData?.fname}</Text>
        <Text style={textStyle.labelText}>{profileData?.bio}</Text>
      </View>


      <CustomButton
        label='Logout'
        btnColor={colorPalette.btnPrimary}
        btnHeight={height * 0.08}
        btnWidth={width * 0.7}
        borderRadius={20}
        onPress={() => {
          auth().signOut();
          GoogleSignin.signOut();
          dispatch(removeData([]))
          dispatch(deleteState([]))
          dispatch(removeSurveyProgress([]))
        }}
      />
    </View>
  );
};

export default UserProfile;
