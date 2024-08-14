import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../context/screenContext';
import styles from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colorPalette} from '../../assets/colorpalette/colorPalette';
const HeaderTab: React.FC = () => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait} = screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  return (
    <View style={screenStyles.container}>
      <TouchableOpacity>
        <AntDesign name="flag" color={colorPalette.black} size={25} />
      </TouchableOpacity>

      <TouchableOpacity>
        <AntDesign name="message1" color={colorPalette.black} size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderTab;
