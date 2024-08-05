import {View, Text} from 'react-native';
import React from 'react';
import { useScreenContext } from '../../context/screenContext';
import styles from './style';

const UidModal = () => {
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
      <View>
        <Text style={screenStyles.btnText}>
          How do i know if i have a unique id
        </Text>
      </View>
    </View>
  );
};

export default UidModal;
