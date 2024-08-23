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
import WeighGraphScreen from '../../../screens/afterAuth/WeighGraphScreen';
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableOpacityBase } from 'react-native';
import textStyle from '../../../style/text/style';
import { colorPalette } from '../../../assets/colorpalette/colorPalette';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



const HomeNativeStack = () => {

  const navigation = useNavigation();



  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenNames.HomeScreen} component={Home}
      />
      <Stack.Screen name={screenNames.courseCarouselPage} component={Coursecarousel} />
      <Stack.Screen name={screenNames.Daily_ProgressScreen} component={DailyProgressScreen} />
    </Stack.Navigator>
  );
};

const HomeTabStack = ({ route }: any) => {

  const currentUid = auth().currentUser?.uid;
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (admin_uid === currentUid) {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
  }, [])
  console.log(route)
  return (
    <Tab.Navigator screenOptions={{ headerShown: true }}
    >
      {!isAdmin ?
        <>
          <Tab.Screen name={screenNames.HomeNativeStack} component={HomeNativeStack}
            options={{
              tabBarIcon: () => (
                <Entypo name='home' size={20} color={'black'} />
              ),

              title: 'Home'
            }}


          />
          <Tab.Screen name={screenNames.WeighGraphScreen} component={WeighGraphScreen}
            options={{
              tabBarIcon: () => (
                <Entypo name='line-graph' size={20} color={'black'} />
              ),
              title:'kssksk'
            }}
          />  
        </>
        :
        <Tab.Screen name={screenNames.ChatScreen} component={AdminScreens} />
      }
    </Tab.Navigator >
  );
};

export default HomeTabStack;
