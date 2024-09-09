import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import { useScreenContext } from '../../../context/screenContext';
import styles from './style';
import { colorPalette } from '../../../assets/colorpalette/colorPalette';
import { useNavigation } from '@react-navigation/native';

const EntryScreen: React.FC = () => {
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
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
      <View style={screenStyles.container}>
        <StatusBar
          backgroundColor={'white'}
          showHideTransition={'slide'}
          animated
          barStyle={'dark-content'}
        />
        <Text style={screenStyles.headingText}>Noom</Text>
        <View style={screenStyles.bannerContainer}>
          <Image
            source={require('../../../assets/images/background/entryBanner.jpg')}
            style={screenStyles.bannerImg}
          />
        </View>

        <View style={screenStyles.actionContainer}>
          <Text style={screenStyles.subHeading}>
            We use psychology to help you lose weight and keep it off
          </Text>
          <TouchableOpacity
            style={screenStyles.authBtn}
            onPress={() => navigation.navigate('registerStack')}>
            <Text style={screenStyles.authBtnText}>
              Try for 7 days risk free
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={screenStyles.loginBtn}
            onPress={() => navigation.navigate('login')}>
            <Text style={screenStyles.subHeading}>
              Already Have an account ?{' '}
              <Text style={{ color: 'blue' }}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EntryScreen;
