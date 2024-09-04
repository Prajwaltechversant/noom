import { Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../../screens/afterAuth/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Coursecarousel from '../../../screens/afterAuth/courseCarousel';
import { screenNames, staticVariables } from '../../../preferences/staticVariable';
import DailyProgressScreen from '../../../screens/afterAuth/addDailyProgressScreen';
import { admin_uid } from "@env"
import auth from '@react-native-firebase/auth';
import AdminScreens from '../../../screens/afterAuth/admin';
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import textStyle from '../../../style/text/style';
import { colorPalette } from '../../../assets/colorpalette/colorPalette';
import DrawerStack from '../DrawerStack';
import WeighScreen from '../../../screens/afterAuth/WeighGraphScreen';
import UserProfile from '../../../screens/afterAuth/UserProfile';
import DailyProgress from '../../../screens/afterAuth/Progress';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import HeaderTab from '../../../components/headerTab';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



export const HomeNativeStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen name={screenNames.HomeScreen} component={Home}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name={screenNames.courseCarouselPage} component={Coursecarousel}
        options={{
          headerShown: true,
          title: staticVariables.EMPTY_STRING
        }}
      />
      <Stack.Screen name={screenNames.Daily_ProgressScreen} component={DailyProgressScreen}
        options={{
          headerShown: true,
          title: staticVariables.EMPTY_STRING
        }}
      />
      <Stack.Screen name={screenNames.DailyProgress} component={DailyProgress}

        options={{
          headerShown: true,
          title: staticVariables.EMPTY_STRING
        }}
      />
    </Stack.Navigator>
  );
};

const HomeTabStack = ({ route }: any) => {
  const currentUid = auth().currentUser?.uid;
  const [isAdmin, setIsAdmin] = useState(false)
  const navigation = useNavigation();

  useEffect(() => {

    if (admin_uid === currentUid) {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)



    }
  }, [])
  return (
    <Tab.Navigator
    >
      {!isAdmin ?
        <>
          <Tab.Screen name={'Home'} component={DrawerStack}
            options={{
              tabBarIcon: () => (
                <Entypo name='home' size={20} color={'black'} />
              ),
              title: 'Home',
              headerShown: false,

            }}


          />
          <Tab.Screen name={screenNames.WeighGraphScreen} component={WeighScreen}
            options={{
              tabBarIcon: () => (
                <Entypo name='line-graph' size={20} color={'black'} />
              ),
              title: 'Graph',
              headerShown: true

            }}
          />
          <Tab.Screen name={screenNames.UserProfile} component={UserProfile}
            options={{
              tabBarIcon: () => (
                <Entypo name='user' size={20} color={'black'} />
              ),
              title: 'Profile',
              headerShown: true

            }}
          />
          {/* UserProfile */}
        </>
        :
        <Tab.Screen name={screenNames.ChatScreen} component={AdminScreens}

          options={{
            headerRight: () => {
              return (
                <TouchableOpacity style={{ marginRight: 20 }}

                  onPress={() => {
                    auth().signOut();
                    GoogleSignin.signOut();
                  }}
                >
                  <Text style={[textStyle.labelText, { color: colorPalette.stream }]}>
                    Logout
                  </Text>
                </TouchableOpacity>
              );
            },
          }}
        />
      }
    </Tab.Navigator >
  );
};

export default HomeTabStack;
