import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../../screens/afterAuth/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Coursecarousel from '../../../screens/afterAuth/courseCarousel';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeNativeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen  name='courseCarouselPage' component={Coursecarousel} />
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
