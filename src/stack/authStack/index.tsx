import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EntryScreen from '../../screens/beforeAuth/entry';
import RegisterMethods from '../../screens/beforeAuth/register/registerList';
import Signup from '../../screens/beforeAuth/register/signup';
import Login from '../../screens/beforeAuth/login';
import EmailSignup from '../../screens/beforeAuth/register/EmailSignup';
import textStyle from '../../style/text/style';
import {colorPalette} from '../../assets/colorpalette/colorPalette';
import {useDispatch, useSelector} from 'react-redux';
import {validation} from '../../services/validation';
import {addError} from '../../redux/slices/Auth/loginSlice';
import {SignupWithEmailErrorType} from '../../types/signup';
import {signUpWithEmail} from '../../services/signup';

const Stack = createNativeStackNavigator();

const RegisterStack = () => {
  const loginData = useSelector(state => state.loginSlice);

  const [error, setError] = React.useState<SignupWithEmailErrorType>({
    emailErr: undefined,
    passwordErr: undefined,
  });
  const {formData} = loginData;
  const dispatch = useDispatch();
  const handleRegister = async () => {
    let isEmail: any = validation('email', formData.email);
    let isPassword: any = validation('password', formData.password);
    if (!isEmail.value) {
      console.log('owhdiowqhd')
      setError({...error, emailErr: 'isEmail.error'});
    }
    if (!isPassword.value) {
      setError({...error, passwordErr: isPassword.error});
    } else {
      setError({...error, passwordErr: undefined});
    }
    if (!error.emailErr && !error.passwordErr) {
      signUpWithEmail(formData);
    } else {
      dispatch(addError(error));
    }
  };
  console.log(error);
  return (
    <Stack.Navigator>
      <Stack.Screen name="registerMethods" component={RegisterMethods} />
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen
        name="emailSignup"
        component={EmailSignup}
        options={{
          title: '',

          headerRight: () => {
            return (
              <TouchableOpacity onPress={handleRegister}>
                <Text
                  style={[textStyle.labelText, {color: colorPalette.stream}]}>
                  NEXT
                </Text>
              </TouchableOpacity>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Entry"
        component={EntryScreen}
        // options={{headerShown: false}}
      />
      <Stack.Screen name="registerStack" component={RegisterStack} />

      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
