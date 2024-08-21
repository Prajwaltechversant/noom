import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EntryScreen from '../../screens/afterAuth/AppEntryScreen';
import { useScreenContext } from '../../context/screenContext';
import { colorPalette } from '../../assets/colorpalette/colorPalette';
import textStyle from '../../style/text/style';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import OnboardingScreen from '../../screens/afterAuth/onBoarding';
import { screenNames } from '../../preferences/staticVariable';
import OnboardingStack from './onBoardingStack';
import ProfileScreen1 from '../../screens/afterAuth/profileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppSelector } from '../../redux/hook';
import Home from '../../screens/afterAuth/HomeScreen';
import DrawerStack from './DrawerStack';
import { admin_uid } from "@env"

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait, isTabletType, scale } =
    screenContext;
  const [surveyStatus, setSurveyStatus] = useState(false);
  const currentUser = auth().currentUser?.email;
  const displayName = auth().currentUser?.displayName;

  const onBaodringStatus = useAppSelector(
    state => state.authStatus.isOnBoardingCompleted,
  );
  const isProfileCompleted = useAppSelector(
    state => state.authStatus.isProfileCompletd,
  );

  const app = isProfileCompleted && onBaodringStatus;
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
    <Stack.Navigator>
      {!isAdmin ? <>
        {!app ? (
          <>
            {!onBaodringStatus && (
              <>
                <Stack.Screen
                  name={screenNames.APP_ENTRY_SCREEN}
                  component={EntryScreen}
                  options={{
                    headerShown: true,
                    header: () => {
                      return (
                        <View
                          style={{
                            height: height * 0.1,
                            backgroundColor: colorPalette.sand,
                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              justifyContent: 'center',
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 5,
                            }}>
                            <Text
                              style={textStyle.headingText}
                              onPress={() => {
                                auth().signOut();
                                GoogleSignin.signOut();
                              }}>
                              NOOM
                            </Text>
                            <Text
                              style={[
                                {
                                  backgroundColor: 'black',
                                  color: 'white',
                                  borderRadius: 20,
                                  width: width * 0.2,
                                  textAlign: 'center',
                                },
                              ]}>
                              WEIGHT
                            </Text>
                          </View>
                        </View>
                      );
                    },
                  }}
                />
                <Stack.Screen
                  name={screenNames.ONBAORDING}
                  component={OnboardingStack}
                  options={{
                    title: 'Noom',
                    headerRight: () => (
                      <Text style={textStyle.labelText}>{displayName !== null ? displayName : currentUser}</Text>
                    ),
                  }}
                />
              </>
            )}
            {!isProfileCompleted && (
              <Stack.Screen
                name="profile"
                component={ProfileScreen1}
                options={{
                  title: 'Fill Out Your Profile',
                }}
              />
            )}
          </>
        ) : (
          <Stack.Screen
            name="Home"
            component={DrawerStack}
            options={{ headerShown: false }}
          />
        )}
      </>
        :
        <>
          <Stack.Screen
            name="Home"
            component={DrawerStack}
            options={{ headerShown: false }}
          />
        </>
      }
    </Stack.Navigator>
  );
};

export default AppStack;
