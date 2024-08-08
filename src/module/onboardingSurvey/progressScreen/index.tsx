import {View, Text} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../../context/screenContext';
import styles from '../../../screens/afterAuth/onBoarding/style';

const ProgressScreen: React.FC = () => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait, isTabletType, scale} =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  return (
    <View>
      <Text>ProgressScreen:React.FC</Text>
    </View>
  );
};

export default ProgressScreen;
