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
import { screenNames } from '../../preferences/staticVariable';

const Stack = createNativeStackNavigator();

const RegisterStack = () => {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator 
    
    >
      <Stack.Screen name={screenNames.REGISTER_METHODS} component={RegisterMethods} />
      <Stack.Screen name={screenNames.SIGNUP} component={Signup} />
      <Stack.Screen
        name={screenNames.EMAIL_SIGNUP}
        component={EmailSignup}
      />
    </Stack.Navigator>
  );
};

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={screenNames.AUTH_ENTRY_SCREEN}
        component={EntryScreen}
      />
      <Stack.Screen name={screenNames.REGISTER_STACK} component={RegisterStack} />
      <Stack.Screen name={screenNames.LOGIN} component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
