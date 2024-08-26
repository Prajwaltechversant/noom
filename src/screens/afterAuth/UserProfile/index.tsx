import { View, Text, KeyboardAvoidingView, Alert, Image } from 'react-native';
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
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../../redux/hook';
import { updateProfileStatus } from '../../../redux/slices/authStatus';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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
  const [image, setImage] = useState<undefined | string>(undefined);
  const [formData, setFormData] = useState<Form>({
    fname: undefined,
    lname: undefined,
    bio: undefined,
  });
  const currentUid = auth().currentUser?.uid;
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();



  return (
    <KeyboardAvoidingView style={screenStyles.container}>
      

      <Text style={[textStyle.labelText, { textAlign: 'center' }]}>
        Your group will be able to read this , Lorem ipsum dolor, sit amet
        consectetur adipisicing elit. Repudiandae, facere molestiae adipisci
      </Text>

      <TouchableOpacity
      onPress={()=>{
        auth().signOut();
        GoogleSignin.signOut();
      }}
      >
        <Text>logout</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default UserProfile;
