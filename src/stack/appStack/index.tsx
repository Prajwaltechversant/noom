import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EntryScreen from '../../screens/afterAuth/AppEntryScreen';
import { useScreenContext } from '../../context/screenContext';
import { colorPalette } from '../../assets/colorpalette/colorPalette';
import textStyle from '../../style/text/style';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { screenNames } from '../../preferences/staticVariable';
import OnboardingStack from './onBoardingStack';
import ProfileScreen1 from '../../screens/afterAuth/profileScreen';
import { admin_uid } from "@env"
import HomeTabStack from './HomeStack';
import ChatScreen from '../../screens/afterAuth/drawer screens/chatScreen';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';

const Stack = createNativeStackNavigator();


type ProfileStatus = {
  isOnBoardingCompleted: boolean,
  isProfileCompleted: boolean,
  isFirst: string | number
}

const AppStack = () => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait, isTabletType, scale } =
    screenContext;
  const [surveyStatus, setSurveyStatus] = useState(false);
  const currentUser = auth().currentUser?.email;
  const displayName = auth().currentUser?.displayName;
  const [userProfileStatus, setIsProfileStatus] = useState<ProfileStatus>({
    isOnBoardingCompleted: false,
    isProfileCompleted: false,
    isFirst: 0
  })
  const currentUid = auth().currentUser?.uid;
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const subscriber = firestore()
      .collection(`UserData/${currentUid}/profileCompletionStatus`)
      .doc(currentUid)
      .onSnapshot((documentSnapshot: any) => {
        let res = documentSnapshot.data()
        setIsProfileStatus({ ...res })
        setIsLoading(false)
      });
    return () => subscriber();
  }, []);

  const app = userProfileStatus.isOnBoardingCompleted && userProfileStatus.isProfileCompleted

  useEffect(() => {
    if (admin_uid === currentUid) {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
  }, [])

  if (isLoading) return <Loader />
  return (
    <Stack.Navigator>
      {!isAdmin ?
        <>
          {!app ? (
            <>
              {!userProfileStatus.isOnBoardingCompleted && (
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
                                >
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
              {!userProfileStatus.isProfileCompleted && (
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
              name={screenNames.Homepage}
              component={HomeTabStack}
              options={{ headerShown: false }}
            />
          )}
        </>
        :
        <>
          <Stack.Screen
            name={screenNames.Homepage}
            component={HomeTabStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={screenNames.Message_Screen}
            component={ChatScreen}

            options={{

              title: 'Chat with user'
            }}
          />
        </>
      }
    </Stack.Navigator>
  );
};

export default AppStack;
