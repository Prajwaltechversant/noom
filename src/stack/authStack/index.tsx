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
  const dispatch = useDispatch();
  return (
    <Stack.Navigator 
    
    >
      <Stack.Screen name="registerMethods" component={RegisterMethods} />
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen
        name="emailSignup"
        component={EmailSignup}
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
      />
      <Stack.Screen name="registerStack" component={RegisterStack} />

      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
