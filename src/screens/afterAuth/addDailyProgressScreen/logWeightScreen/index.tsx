import {View, Text} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../../../context/screenContext';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import Scale from '../../../../components/scale';

const LogWeightScreen: React.FC = () => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait} = screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation: any = useNavigation();
  return (
    <View>
      <Scale />
    </View>
  );
};

export default LogWeightScreen;
