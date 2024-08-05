import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EntryScreen from '../../screens/beforeAuth/entry';
import RegisterMethods from '../../screens/beforeAuth/register/registerList';
import Signup from '../../screens/beforeAuth/register/signup';
import Login from '../../screens/beforeAuth/login';

const Stack = createNativeStackNavigator();



const RegisterStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="registerMethods" component={RegisterMethods} />
      <Stack.Screen name='signup' component={Signup}  />
      {/* <Stack.Screen name='signup' component={Signup}  /> */}

    </Stack.Navigator>
  );
};

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen
        name="Entry"
        component={EntryScreen}
        // options={{headerShown: false}}
      />
      <Stack.Screen name="registerStack" component={RegisterStack} />

      <Stack.Screen name='login' component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
