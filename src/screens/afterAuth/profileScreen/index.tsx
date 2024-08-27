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

type Form = {
  lname: string | undefined;
  fname: string | undefined;
  bio?: string | undefined;
  image: string | undefined;

};

const ProfileScreen1 = () => {
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
    image: undefined
  });
  const currentUid = auth().currentUser?.uid;
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const handleImagePicker = async () => {
    try {
      const result: any = await launchImageLibrary({ mediaType: 'photo' });
      setImage(result.assets[0].uri);
      setFormData({ ...formData, image: result.assets[0].uri });

    } catch (error) {
      console.log(error);
    }
  };
  const updateAuthStatus = async () => {
    try {
      await firestore().collection(`UserData/${currentUid}/profileCompletionStatus`).doc(currentUid).set({
        isOnBoardingCompleted: true,
        isProfileCompleted: true
      })

    } catch (error) {
      console.error("Error ", error);
    }
  }
  const handleSubmit = async () => {
    const { fname, lname } = formData;
    try {
      if (!fname || !lname || !image) {
        Alert.alert('Please Add the details');
      } else {
        await storage().ref(`Users/${currentUid}/profile`).putFile(image);
        firestore()
          .collection(`UserData/${currentUid}/profile`)
          .add({
            ...formData,
          })
          .then(() => {
            console.log('profile added');
            updateAuthStatus()
          });
        dispatch(updateProfileStatus(true));
        navigation.replace('Home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={[textStyle.labelText, { color: colorPalette.stream }]}>
              NEXT
            </Text>
          </TouchableOpacity>
        );
      },
    });
  }, [formData, image]);
  return (
    <KeyboardAvoidingView style={screenStyles.container}>
      <View style={screenStyles.profileSection}>
        <Text style={textStyle.questionText}>Profile Picture</Text>
        {!image ? (
          <TouchableOpacity
            style={screenStyles.profileIcon}
            onPress={handleImagePicker}>
            <AntDesign name="camera" size={20} color={colorPalette.black} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={screenStyles.profileIcon}
            onPress={handleImagePicker}>
            <Image source={{ uri: image }} style={screenStyles.profileImage} />
          </TouchableOpacity>
        )}
      </View>
      <View>
        <CustomTextInputComponent
          textColor='black'

          mode="outlined"
          label={'First Name'}
          onChangeText={e => setFormData({ ...formData, fname: e })}
          value={formData.fname}
        />
        <CustomTextInputComponent
          textColor='black'
          mode="outlined"
          label={'Last Name'}
          onChangeText={e => setFormData({ ...formData, lname: e })}
          value={formData.lname}
        />
        <CustomTextInputComponent
          textColor='black'

          mode="outlined"
          label={'Bio'}
          multiline
          contentStyle={{ height: 100 }}
          onChangeText={e => setFormData({ ...formData, bio: e })}
        />
      </View>

      <Text style={[textStyle.labelText, { textAlign: 'center' }]}>
        Your group will be able to read this , Lorem ipsum dolor, sit amet
        consectetur adipisicing elit. Repudiandae, facere molestiae adipisci
      </Text>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen1;
