import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useScreenContext } from '../../../context/screenContext';
import styles from './style';
import { TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colorPalette } from '../../../assets/colorpalette/colorPalette';
import CustomTextInputComponent from '../../textInput';
const ChatBox = () => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait, isTabletType, scale } =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.messageBox}>
        <CustomTextInputComponent
          mode='outlined'
          label={''}
          textColor='red'
          style={screenStyles.textInput}
          theme={{
            roundness: 0
          }}

        />
        <TouchableOpacity style={screenStyles.sendBtn}>
          <Ionicons name='send-sharp' size={30} color={colorPalette.black} style={{ textAlign: 'center', alignSelf: 'center' }} />

        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ChatBox