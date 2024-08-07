import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EntryScreen from '../../screens/afterAuth/AppEntryScreen';
import {useScreenContext} from '../../context/screenContext';
import {colorPalette} from '../../assets/colorpalette/colorPalette';
import textStyle from '../../style/text/style';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import OnboardingScreen from '../../module/onboardingSurvey';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait, isTabletType, scale} =
    screenContext;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="appEntryScreen"
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

      <Stack.Screen name='onboarding' component={OnboardingScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
