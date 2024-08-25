import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeTabStack, { HomeNativeStack } from '../HomeStack';
import {screenNames} from '../../../preferences/staticVariable';
import MessageScreen from '../../../screens/afterAuth/drawer screens/messages';
import WeightGraphScreen from '../../../screens/afterAuth/drawer screens/weight graph';
import MyArticleScreen from '../../../screens/afterAuth/drawer screens/my articles';
import SettingsScreen from '../../../screens/afterAuth/drawer screens/settings';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HeaderTab from '../../../components/headerTab';
import ChatScreen from '../../../screens/afterAuth/drawer screens/chatScreen';
import FlowChart from '../../../screens/afterAuth/drawer screens/Progress';
const Drawer = createDrawerNavigator();



const DrawerStack = ({route}:any) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerRight: () => <HeaderTab />,
      }}
      
      >
      <Drawer.Screen
        name={screenNames.HomeNativeStack}
        component={HomeNativeStack}
        options={{
          title: 'Home',
          drawerIcon: () => <AntDesign name={'home'} color={'black'} size={20} />,
        }}
      />
      <Drawer.Screen
        name={screenNames.Message_Screen}
        component={ChatScreen}
        options={{
          drawerIcon: () => (
            <AntDesign name="message1" color={'black'} size={20} />
          ),
        }}
      />
      <Drawer.Screen
        name={screenNames.My_Articles}
        component={MyArticleScreen}
        options={{
          drawerIcon: () => <AntDesign name="home" color={'black'} size={20} />,
        }}
      />
            <Drawer.Screen
        name={'progress'}
        component={FlowChart}
        options={{
          drawerIcon: () => <AntDesign name="home" color={'black'} size={20} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
