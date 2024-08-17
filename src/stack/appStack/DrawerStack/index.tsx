import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeTabStack from '../HomeStack';
import {screenNames} from '../../../preferences/staticVariable';
import MessageScreen from '../../../screens/afterAuth/drawer screens/messages';
import WeightGraphScreen from '../../../screens/afterAuth/drawer screens/weight graph';
import ReciepiesScreen from '../../../screens/afterAuth/drawer screens/reciepies';
import MyArticleScreen from '../../../screens/afterAuth/drawer screens/my articles';
import SettingsScreen from '../../../screens/afterAuth/drawer screens/settings';
import HelpScreen from '../../../screens/afterAuth/drawer screens/Help';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HeaderTab from '../../../components/headerTab';
import ChatScreen from '../../../screens/afterAuth/drawer screens/chatScreen';
const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerRight: () => <HeaderTab />,
      }}>
      <Drawer.Screen
        name="drawer"
        component={HomeTabStack}
        options={{
          title: 'Home',
          drawerIcon: () => <AntDesign name="home" color={'black'} size={20} />,
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
        name={screenNames.Weighgraph}
        component={WeightGraphScreen}
        options={{
          drawerIcon: () => <AntDesign name="home" color={'black'} size={20} />,
        }}
      />

      <Drawer.Screen
        name={screenNames.Recipies}
        component={ReciepiesScreen}
        options={{
          drawerIcon: () => <AntDesign name="home" color={'black'} size={20} />,
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
        name={screenNames.Setting}
        component={SettingsScreen}
        options={{
          drawerIcon: () => <AntDesign name="home" color={'black'} size={20} />,
        }}
      />
      <Drawer.Screen
        name={screenNames.Help_Screen}
        component={HelpScreen}
        options={{
          drawerIcon: () => <AntDesign name="home" color={'black'} size={20} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
