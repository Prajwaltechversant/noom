import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../../../screens/afterAuth/onBoarding';
import PlanScreen from '../../../module/onboardingSurvey/planScreen';
import {screenNames} from '../../../preferences/staticVariable';
import EChartComponent from '../../../module/echart/echart1';
import InfoScreen from '../../../module/onboardingSurvey/infoScreens/infoScreen1';
import PaymentScreen1 from '../../../module/payment/paymentScreen1';
import PaymementScreen2 from '../../../module/payment/paymentScreen2';
const Stack = createNativeStackNavigator();

const OnboardingStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={screenNames.ONBBOARDING_SCREEN}
        component={OnboardingScreen}
      />
      <Stack.Screen name={screenNames.Plan_Screen} component={PlanScreen} />
      <Stack.Screen
        name={screenNames.Echart_Screen1}
        component={EChartComponent}
      />
      <Stack.Screen name={screenNames.infoScreen1} component={InfoScreen} />
      <Stack.Screen
        name={screenNames.Payment_Screen1}
        component={PaymentScreen1}
      />
      <Stack.Screen
        name={screenNames.Payment_Screen2}
        component={PaymementScreen2}
      />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
