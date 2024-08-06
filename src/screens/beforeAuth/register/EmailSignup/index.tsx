import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styles from './style';
import {useScreenContext} from '../../../../context/screenContext';
import {useNavigation} from '@react-navigation/native';
import CustomTextInputComponent from '../../../../components/textInput';
import textStyle from '../../../../style/text/style';
import Feather from 'react-native-vector-icons/Feather';
import {
  SignupWithEmailErrorType,
  SignupWithEmailtype,
} from '../../../../types/signup';
import {validation} from '../../../../services/validation';
import {TextInput} from 'react-native-paper';
import {colorPalette} from '../../../../assets/colorpalette/colorPalette';
import {signUpWithEmail} from '../../../../services/signup';
import {useDispatch, useSelector} from 'react-redux';
import {addData} from '../../../../redux/slices/Auth/loginSlice';

const EmailSignup = () => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait, isTabletType, scale} =
    screenContext;

  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );

  const [formData, setFormData] = useState<SignupWithEmailtype>({
    email: undefined,
    password: undefined,
  });

  const loginData = useSelector(state => state.loginSlice);
  const {formError} = loginData;

  const [error, setError] = useState<SignupWithEmailErrorType>({
    emailErr: undefined,
    passwordErr: undefined,
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleStateUpdate = (
    input: keyof SignupWithEmailtype,
    value: string,
  ) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [input]: value,
    }));
    dispatch(addData(formData));
  };

  useMemo(() => {
    setError({emailErr: formError?.email, passwordErr: formError?.password});
  }, [formError]);

  return (
    <View style={screenStyles.container}>
      <Text style={textStyle.headingText}>Create Your Account</Text>
      <View>
        <CustomTextInputComponent
          backgroundColor="white"
          label="Email"
          textColor="Black"
          onChangeText={e => handleStateUpdate('email', e)}
          // error={error?.email ? true : false}
          secureTextEntry={showPassword}
          value={formData.email}
        />

        <CustomTextInputComponent
          backgroundColor="white"
          label="Password"
          textColor="Black"
          inputMode="text"
          value={formData.password}
          secureTextEntry={showPassword}
          onChangeText={e => handleStateUpdate('password', e)}
          // error={error?.password ? true : false}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
      </View>
    </View>
  );
};

export default EmailSignup;
