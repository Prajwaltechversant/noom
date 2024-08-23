import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useScreenContext } from '../../context/screenContext';
import styles from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colorPalette } from '../../assets/colorpalette/colorPalette';
import { useNavigation } from '@react-navigation/native';
import { screenNames } from '../../preferences/staticVariable';
const HeaderTab: React.FC = ({route}:any) => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait } = screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );

  const navigation: any = useNavigation()
  return (
    <View style={screenStyles.container}>
      <TouchableOpacity>
        <AntDesign name="flag" color={colorPalette.black} size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home', {
            screen: screenNames.Message_Screen,
          })
        }}
      >
        <AntDesign name="message1" color={colorPalette.black} size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderTab;
