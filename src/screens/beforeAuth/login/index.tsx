import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ImageBg from '../../../components/ImgBg';
import {useScreenContext} from '../../../context/screenContext';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../../components/button/customButton';
import {colorPalette} from '../../../assets/colorpalette/colorPalette';
import textStyle from '../../../style/text/style';
import PrivacyPolicy from '../../../components/privacyPolicy';
import CustomTextInputComponent from '../../../components/textInput';
import {SignupWithEmailtype} from '../../../types/signup';
import {TextInput} from 'react-native-paper';
import {login} from '../../../services/signin';

export default function Login() {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait, isTabletType, scale} =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );

  const [isLogin, setIsLogin] = useState(false);
  const navigation: any = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SignupWithEmailtype>({
    email: undefined,
    password: undefined,
  });

  const handleStateUpdate = (
    input: keyof SignupWithEmailtype,
    value: string,
  ) => {
    setFormData({...formData, [input]: value});
  };

  const handleLogin = async () => {
    const {email, password} = formData;
    if (!password || !email) {
      Alert.alert('Please add the details');
    } else {
      const response: any = await login(formData);
      if (!response?.res) {
        console.log(response);
        Alert.alert(response.error);
      }
    }
  };

  return (
    <ImageBg
      image={require('../../../assets/images/background/login.jpg')}
      height={height}
      width={width}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[screenStyles.container]}>
        <Text style={textStyle.headingText}>Noom</Text>
        {isLogin && (
          <Text style={textStyle.labelText}>
            Sign in with your account information
          </Text>
        )}

        <View style={screenStyles.btnContainer}>
          {!isLogin ? (
            <>
              <CustomButton
                btnColor={colorPalette.tarocco}
                btnHeight={screenContext.isPortrait ? width * 0.1 : width * 0.1}
                btnWidth={screenContext.isPortrait ? width * 0.8 : width * 0.8}
                label="Login With email"
                labelColor="white"
                icon={undefined}
                onPress={() => setIsLogin(!isLogin)}
              />
              <CustomButton
                btnColor={colorPalette.Lagoon}
                btnHeight={screenContext.isPortrait ? width * 0.1 : width * 0.1}
                btnWidth={screenContext.isPortrait ? width * 0.8 : width * 0.8}
                label="Login With facebook"
                labelColor="white"
                icon={'facebook-square'}
              />
              <CustomButton
                btnColor={colorPalette.Lagoon}
                btnHeight={screenContext.isPortrait ? width * 0.1 : width * 0.1}
                btnWidth={screenContext.isPortrait ? width * 0.8 : width * 0.8}
                label="Login With google"
                labelColor="white"
                icon={'google'}
              />
            </>
          ) : (
            <>
              <CustomTextInputComponent
                mode="outlined"
                label={'email'}
                onChangeText={e => handleStateUpdate('email', e)}
              />
              <CustomTextInputComponent
                mode="outlined"
                label={'email'}
                textColor="black"
                secureTextEntry={showPassword}
                onChangeText={e => handleStateUpdate('password', e)}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />

              <CustomButton
                btnWidth={width * 0.8}
                btnHeight={width * 0.12}
                btnColor="red"
                label="Next"
                borderRadius={5}
                labelColor="white"
                onPress={handleLogin}
              />
            </>
          )}
        </View>

        <View style={screenStyles.privacyPolicy}>
          <PrivacyPolicy />
        </View>
      </KeyboardAvoidingView>
    </ImageBg>
  );
}
