import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../../screens/afterAuth/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Coursecarousel from '../../../screens/afterAuth/courseCarousel';
import { screenNames } from '../../../preferences/staticVariable';
import DailyProgressScreen from '../../../screens/afterAuth/addDailyProgressScreen';
import { admin_uid } from "@env"
import auth from '@react-native-firebase/auth';
import AdminScreens from '../../../screens/afterAuth/admin';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



const HomeNativeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenNames.HomeScreen} component={Home}
      />
      <Stack.Screen name={screenNames.courseCarouselPage} component={Coursecarousel} />
      <Stack.Screen name={screenNames.Daily_ProgressScreen} component={DailyProgressScreen} />
    </Stack.Navigator>
  );
};

const HomeTabStack = () => {
  const currentUid = auth().currentUser?.uid;
  const [isAdmin, setIsAdmin] = useState(false)


  useEffect(() => {
    if (admin_uid === currentUid) {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)

    }
  }, [])
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {!isAdmin ?
        <>
          <Tab.Screen name="HomeScreen" component={HomeNativeStack} />
          <Tab.Screen name="HomeScreen2" component={Home} />
        </>
        :
        <Tab.Screen name={screenNames.ChatScreen} component={AdminScreens} />
      }
    </Tab.Navigator >
  );
};

export default HomeTabStack;
