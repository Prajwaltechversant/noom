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

  const handleSignup = async () => {
    let isEmail: any = validation('email', formData.email);
    let isPassword: any = validation('password', formData.password);

    let newError = {...error};

    if (!isEmail.value) {
      newError.emailErr = isEmail.error;
    } else {
      newError.emailErr = undefined;
    }
    if (!isPassword.value) {
      newError.passwordErr = isPassword.error;
    } else {
      newError.passwordErr = undefined;
    }
    setError(newError);
    if (!newError.emailErr && !newError.passwordErr) {
      setError({emailErr: undefined, passwordErr: undefined});
      signUpWithEmail(formData);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity onPress={handleSignup}>
            <Text style={[textStyle.labelText, {color: colorPalette.stream}]}>
              NEXT
            </Text>
          </TouchableOpacity>
        );
      },
    });
  }, [formData, error, navigation]);
  return (
    <View style={screenStyles.container}>
      <Text style={textStyle.headingText}>Create Your Account</Text>
      <View>
        <CustomTextInputComponent
          backgroundColor="white"
          label="Email"
          textColor="Black"
          onChangeText={e => handleStateUpdate('email', e)}
          error={error?.emailErr ? true : false}
          value={formData.email}
        
        />
        {error.emailErr && (
          <Text style={textStyle.errorText}>{error.emailErr}</Text>
        )}

        <CustomTextInputComponent
          backgroundColor="white"
          label="Password"
          textColor="Black"
          inputMode="text"
          value={formData.password}
          secureTextEntry={showPassword}
          onChangeText={e => handleStateUpdate('password', e)}
          error={error?.passwordErr ? true : false}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        {error.passwordErr && (
          <Text style={textStyle.errorText}>{error.passwordErr}</Text>
        )}
      </View>
    </View>
  );
};

export default EmailSignup;
