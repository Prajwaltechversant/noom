import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useScreenContext } from '../../../../context/screenContext';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { SignupProps } from '../../../../types/types';
import { Button, TextInput } from 'react-native-paper';
import { colorPalette } from '../../../../assets/colorpalette/colorPalette';
import UidModal from '../../../../components/uidModal';
import { faceBookSignup, googleSignup } from '../../../../services/signup';
import { staticVariables } from '../../../../preferences/staticVariable';

const Signup: React.FC = ({ route }: any) => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait, isTabletType, scale } =
    screenContext;

  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation: any = useNavigation();
  const [error, setError] = useState({
    emailError: staticVariables.EMPTY_STRING,
    passwordError: staticVariables.EMPTY_STRING,
  });

  return (
    <View style={screenStyles.container}>
      <Text style={screenStyles.headingText}>
        {route.params?.uid
          ? 'What is your unique Program ID'
          : 'My Noom account'}
      </Text>

      <View style={screenStyles.actionContainer}>
        {route?.params.uid ? (
          <View style={screenStyles.btnContainer}>
            <View style={screenStyles.textInputContainer}>
              <TextInput
                label={'Enter Your Unique Program Id'}
                underlineColor={colorPalette.blossom}
                style={screenStyles.textInput}
              />
            </View>
            <View>
              <Button
                style={screenStyles.subtBtn}
                buttonColor={colorPalette.stream}
                textColor={colorPalette.white}>
                Submit
              </Button>
              <UidModal />
            </View>
          </View>
        ) : (
          <View style={[screenStyles.btnContainer]}>
            <View>
              <TouchableOpacity
                style={[
                  screenStyles.signupBtn,
                  { backgroundColor: colorPalette.btnPrimary },
                ]}
                onPress={() => navigation.navigate('emailSignup')}>
                <Text style={screenStyles.btnText}>Sign up With email</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={[
                  screenStyles.signupBtn,
                  { backgroundColor: colorPalette.btnSec },
                ]}
                onPress={googleSignup}
              >
                <Text>Sign up With google</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                onPress={faceBookSignup}
                style={[
                  screenStyles.signupBtn,
                  { backgroundColor: colorPalette.btnSec },
                ]}>
                <Text>Sign up With facebook</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Signup;
