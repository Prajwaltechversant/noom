import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useScreenContext } from '../../../../context/screenContext';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { Divider, Text } from 'react-native-paper';
import UidModal from '../../../../components/uidModal';

const RegisterMethods: React.FC = () => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait, isTabletType, scale } =
    screenContext;

  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );

  const navigation: any = useNavigation();
  return (
    <View style={screenStyles.container}>
      <View>
        <Text style={screenStyles.headingText}>Choose a Sign up Method</Text>

        <View style={screenStyles.actionContainer}>
          <Divider />
          <View style={screenStyles.btnContainer}>
            <TouchableOpacity
              style={screenStyles.btn}
              onPress={() =>
                navigation.navigate('signup', {
                  uid: false,
                })
              }>
              <Text style={screenStyles.btnText}>
                Sign up with Email, Facebook, or Google
              </Text>
            </TouchableOpacity>
          </View>
          <Divider />

          <View style={screenStyles.btnContainer}>
            <TouchableOpacity
              style={screenStyles.btn}
              onPress={() =>
                navigation.navigate('signup', {
                  uid: true,
                })
              }>
              <Text style={screenStyles.btnText}>
                Sign up with Unique Program Id
              </Text>
            </TouchableOpacity>
          </View>
          <Divider />
        </View>
      </View>
      <View>
        <UidModal />
      </View>
    </View>
  );
};

export default RegisterMethods;
