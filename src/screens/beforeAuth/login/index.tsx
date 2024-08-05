import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ImageBg from '../../../components/ImgBg';
import { useScreenContext } from '../../../context/screenContext';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const image = require('../../../assets/images/background/loginBg.jpg');

  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait, isTabletType, scale} =
    screenContext;

  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );

  const navigation:any = useNavigation();
  return (
    <ImageBackground source={image} style={{width:300,height:300}}>
      <View></View>
    </ImageBackground>
  );
}
