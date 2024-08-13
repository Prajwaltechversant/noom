import {View, Text} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../../../context/screenContext';
import styles from './style';
import {useNavigation} from '@react-navigation/native';

const MyArticleScreen = () => {
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
    <View>
      <Text>index</Text>
    </View>
  );
};

export default MyArticleScreen;
