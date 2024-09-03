import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EntryScreen from '../../screens/beforeAuth/entry';
import RegisterMethods from '../../screens/beforeAuth/register/registerList';
import Signup from '../../screens/beforeAuth/register/signup';
import Login from '../../screens/beforeAuth/login';
import EmailSignup from '../../screens/beforeAuth/register/EmailSignup';
import { screenNames } from '../../preferences/staticVariable';
import { useAppDispatch } from '../../redux/hook';

const Stack = createNativeStackNavigator();



const RegisterStack = () => {
  const dispatch = useAppDispatch()
  return (
    <Stack.Navigator
    >
      <Stack.Screen name={screenNames.REGISTER_METHODS} component={RegisterMethods}
        options={{
          title: 'noomin now'
        }}
      />
      <Stack.Screen name={screenNames.SIGNUP} component={Signup} />
      <Stack.Screen
        name={screenNames.EMAIL_SIGNUP}
        component={EmailSignup}
        options={{
          title: 'Signup With Email'
        }}
      />
    </Stack.Navigator>
  );
};

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={screenNames.AUTH_ENTRY_SCREEN}
        component={EntryScreen}
      />
      <Stack.Screen name={screenNames.REGISTER_STACK} component={RegisterStack}
        options={{
          title: 'Signup to use Noom'
        }}
      />
      <Stack.Screen name={screenNames.LOGIN} component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
