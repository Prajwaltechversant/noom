import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useScreenContext } from '../../context/screenContext';
import { colorPalette } from '../../assets/colorpalette/colorPalette';
import { screenNames } from '../../preferences/staticVariable';
import styles from './style';


const HeaderTab: React.FC = () => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait } = screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );

  const navigation: any = useNavigation()
  const route = useRoute()

  return (
    <View style={screenStyles.container}>
      <TouchableOpacity onPress={() => {
        navigation.navigate('Home', {
          screen: screenNames.My_Articles
          ,
        })
      }}>
        <Ionicons name="bookmarks" color={colorPalette.black} size={25} />
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
