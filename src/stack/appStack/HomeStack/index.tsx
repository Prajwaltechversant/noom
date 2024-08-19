import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../../screens/afterAuth/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Coursecarousel from '../../../screens/afterAuth/courseCarousel';
import { screenNames } from '../../../preferences/staticVariable';
import DailyProgressScreen from '../../../screens/afterAuth/addDailyProgressScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeNativeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name={screenNames.HomeScreen} component={Home}
      />
      <Stack.Screen  name={screenNames.courseCarouselPage}  component={Coursecarousel} />
      <Stack.Screen  name={screenNames.Daily_ProgressScreen} component={DailyProgressScreen}  />
    </Stack.Navigator>
  );
};

const HomeTabStack = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="HomeScreen" component={HomeNativeStack} />
      <Tab.Screen name="HomeScreen2" component={Home} />
      <Tab.Screen name="HomeScreen3" component={Home} />
    </Tab.Navigator>
  );
};

export default HomeTabStack;
