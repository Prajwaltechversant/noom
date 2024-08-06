import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ImageBg from '../../../components/ImgBg';
import {useScreenContext} from '../../../context/screenContext';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../../components/button/customButton';
import {colorPalette} from '../../../assets/colorpalette/colorPalette';
import textStyle from '../../../style/text/style';
import PrivacyPolicy from '../../../components/privacyPolicy';

export default function Login() {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait, isTabletType, scale} =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );

  const navigation: any = useNavigation();
  return (
    <ImageBg
      image={require('../../../assets/images/background/login.jpg')}
      height={height}
      width={width}>
      <View style={[screenStyles.container]}>
        <Text style={textStyle.headingText}>Noom</Text>

        <View style={screenStyles.btnContainer}>
          <CustomButton
            btnColor={colorPalette.Lagoon}
            btnHeight={screenContext.isPortrait ? width * 0.1 : width * 0.1}
            btnWidth={screenContext.isPortrait ? width * 0.8 : width * 0.8}
            label="Login With email"
            labelColor="white"
            icon={undefined}
          />

          <CustomButton
            btnColor={colorPalette.Lagoon}
            btnHeight={screenContext.isPortrait ? width * 0.1 : width * 0.1}
            btnWidth={screenContext.isPortrait ? width * 0.8 : width * 0.8}
            label="Login With facebook"
            labelColor="white"
            icon={'facebook-square'}
          />

          <CustomButton
            btnColor={colorPalette.Lagoon}
            btnHeight={screenContext.isPortrait ? width * 0.1 : width * 0.1}
            btnWidth={screenContext.isPortrait ? width * 0.8 : width * 0.8}
            label="Login With google"
            labelColor="white"
            icon={'google'}
          />
        </View>

        <View style={screenStyles.privacyPolicy}>
          <PrivacyPolicy />
        </View>
      </View>
    </ImageBg>
  );
}
