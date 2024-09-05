import { View, Text } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeTabStack, { HomeNativeStack } from '../HomeStack';
import { screenNames } from '../../../preferences/staticVariable';
import MyArticleScreen from '../../../screens/afterAuth/drawer screens/my articles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HeaderTab from '../../../components/headerTab';
import ChatScreen from '../../../screens/afterAuth/drawer screens/chatScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { log } from 'echarts/types/src/util/log.js';

const Drawer = createDrawerNavigator();


const DrawerStack = ({ route }: any) => {
  const navigation: any = useNavigation()
  return (
    <Drawer.Navigator
    >
      <Drawer.Screen
        name={screenNames.HomeNativeStack}
        component={HomeNativeStack}
        options={{
          title: 'Home',
          drawerIcon: () => <FontAwesome name="home" color={'black'} size={20} />,
          headerRight: () => <HeaderTab />,
        }}
        listeners={{
          drawerItemPress: (e) => {
            navigation.popToTop()
          }
        }}

      />
      <Drawer.Screen
        name={screenNames.Message_Screen}
        component={ChatScreen}
        options={{
          drawerIcon: () => (
            <MaterialIcons name="message" color={'black'} size={20} />
          ),
          title: 'Contact Us',

        }}
      />
      <Drawer.Screen
        name={screenNames.My_Articles}
        component={MyArticleScreen}
        options={{
          drawerIcon: () => <Ionicons name="bookmarks" color={'black'} size={20} />,
          title: 'Articles',
        }}

      />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
