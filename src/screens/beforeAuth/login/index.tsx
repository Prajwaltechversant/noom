import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import ImageBg from '../../../components/ImgBg';
import { useScreenContext } from '../../../context/screenContext';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../../components/button/customButton';
import { colorPalette } from '../../../assets/colorpalette/colorPalette';
import textStyle from '../../../style/text/style';
import CustomTextInputComponent from '../../../components/textInput';
import { SignupWithEmailtype } from '../../../types/signup';
import { TextInput } from 'react-native-paper';
import { login } from '../../../services/signin';
import { faceBookSignup, googleSignup } from '../../../services/signup';
import Loader from '../../../components/Loader';

export default function Login() {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait, isTabletType, scale } =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const [isLogin, setIsLogin] = useState(false);
  const navigation: any = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<SignupWithEmailtype>({
    email: undefined,
    password: undefined,
  });


  const handleStateUpdate = (
    input: keyof SignupWithEmailtype,
    value: string,
  ) => {
    setFormData({ ...formData, [input]: value });
  };

  
  const handleLogin = async () => {
    const { email, password } = formData;
    if (!password || !email) {
      Alert.alert('Please add the details');
    } else {
      setIsLoading(true)
      const response: any = await login(formData);
      setIsLoading(false)
      if (!response?.res) {
        Alert.alert(response?.error);
      }
    }
  };

  if (loading) return <Loader />

  return (
    <>
      <ImageBg
        image={require('../../../assets/images/background/login.jpg')}
        height={isPortrait ? height : width}
        width={isPortrait ? width : height}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
          enabled
          keyboardVerticalOffset={0}
        // style={[screenStyles.container]}
        >

          <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
            <Text style={textStyle.headingText}>Noom</Text>
            {isLogin && (
              <Text style={[textStyle.labelText, { textAlign: 'center' }]}>
                Sign in with your account information
              </Text>
            )}
            <View style={screenStyles.btnContainer}>
              {!isLogin ? (
                <>
                  <CustomButton
                    btnColor={colorPalette.tarocco}
                    btnHeight={screenContext.isPortrait ? width * 0.1 : width * 0.08}
                    btnWidth={screenContext.isPortrait ? width * 0.8 : width * 0.4}
                    label="Login With email"
                    labelColor="white"
                    icon={undefined}
                    onPress={() => setIsLogin(!isLogin)}
                  />
                  <CustomButton
                    btnColor={colorPalette.Lagoon}
                    btnHeight={screenContext.isPortrait ? width * 0.1 : width * 0.08}
                    btnWidth={screenContext.isPortrait ? width * 0.8 : width * 0.4}
                    label="Login With facebook"
                    labelColor="white"
                    icon={'facebook-square'}
                    onPress={faceBookSignup}
                  />
                  <CustomButton
                    btnColor={colorPalette.Lagoon}
                    btnHeight={screenContext.isPortrait ? width * 0.1 : width * 0.08}
                    btnWidth={screenContext.isPortrait ? width * 0.8 : width * 0.4}
                    label="Login With google"
                    labelColor="white"
                    icon={'google'}
                    onPress={googleSignup}
                  />
                </>
              ) : (
                <>
                  <CustomTextInputComponent
                    mode="flat"
                    label={'email'}
                    onChangeText={e => handleStateUpdate('email', e)}
                    underlineColor='transprent'
                    outlineColor='transparent'
                    textColor="black"
                    style={{
                      height: screenContext.isPortrait ? width * 0.1 : width * 0.04,
                      width: screenContext.isPortrait ? width * 0.8 : width * 0.4,
                      marginVertical: screenContext.isPortrait ? height * 0.01 : height * 0.05,
                      alignSelf: 'center'
                    }}
                  />
                  <CustomTextInputComponent
                    mode="flat"
                    label={'Password'}
                    textColor="black"
                    secureTextEntry={showPassword}
                    onChangeText={e => handleStateUpdate('password', e)}
                    right={
                      <TextInput.Icon
                        icon={showPassword ? 'eye-off' : 'eye'}
                        onPress={() => setShowPassword(!showPassword)}
                      />
                    }
                    style={{
                      height: screenContext.isPortrait ? width * 0.1 : width * 0.04,
                      width: screenContext.isPortrait ? width * 0.8 : width * 0.4,
                      marginVertical: screenContext.isPortrait ? height * 0.01 : height * 0.05,
                      alignSelf: 'center'
                    }}
                  />
                  <CustomButton
                    btnWidth={screenContext.isPortrait ? width * 0.8 : width * 0.4}
                    btnHeight={screenContext.isPortrait ? width * 0.12 : width * 0.06}
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
              <Text style={[textStyle.labelText, { textAlign: 'center' }]} numberOfLines={2}>
                By Proceeding, you concent to our Terms of use,
                Support, Privacy Policy and Research Policy
              </Text>
            </View>
          </ScrollView>


        </KeyboardAvoidingView>

      </ImageBg>

    </>
  );
}
