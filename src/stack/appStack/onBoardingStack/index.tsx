import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../../../screens/afterAuth/onBoarding';
import PlanScreen from '../../../module/onboardingSurvey/planScreen';
import { screenNames } from '../../../preferences/staticVariable';
const Stack = createNativeStackNavigator();

const OnboardingStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={screenNames.ONBBOARDING_SCREEN} component={OnboardingScreen} />
      <Stack.Screen name={screenNames.Plan_Screen} component={PlanScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
