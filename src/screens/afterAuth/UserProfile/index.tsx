import { View, Text, KeyboardAvoidingView, Alert, Image, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useScreenContext } from '../../../context/screenContext';
import styles from './style';
import textStyle from '../../../style/text/style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colorPalette } from '../../../assets/colorpalette/colorPalette';
import { TouchableOpacity } from 'react-native';
import CustomTextInputComponent from '../../../components/textInput';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../../redux/hook';
import { updateProfileStatus } from '../../../redux/slices/authStatus';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import CustomButton from '../../../components/button/customButton';
import { removeData } from '../../../redux/slices/onBoardingAnswers';
import { deleteState } from '../../../redux/slices/planSlice';
import { removeSurveyProgress } from '../../../redux/slices/surveyProgressSlice/surveySlice';
import { ActivityIndicator } from 'react-native-paper';
import ActivityLoader from '../../../components/ActivityLoader';
import ImageSkeltonComponent from '../../../components/skeltons/imageSkelton';

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
  const [image, setImage] = useState<undefined | string>('')
  const [loading, setLoading] = useState(true)


  // function fetch user profile image from firebase storage
  const getImageFromStorage = async () => {
    const res = await storage().ref(`Users/${currentUid}/profile`).getDownloadURL();
    if (res) {
      setImage(res)
    } else {
      setImage(undefined)
    }
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
            <Image source={{ uri: image }} style={screenStyles.profileImage}
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
