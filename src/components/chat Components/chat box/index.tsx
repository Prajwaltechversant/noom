import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { useScreenContext } from '../../../context/screenContext';
import styles from './style';
import { TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colorPalette } from '../../../assets/colorpalette/colorPalette';
import CustomTextInputComponent from '../../textInput';


interface Props {
  setMessage: Dispatch<SetStateAction<string>>,
  sendMessage: () => void,
  message:string
}

const ChatBox: React.FC<Props> = ({ setMessage, sendMessage,message }) => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait, isTabletType, scale } =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  return (
    <KeyboardAvoidingView style={screenStyles.container}>
      <View style={screenStyles.messageBox}>
        <CustomTextInputComponent
          mode='outlined'
          label={''}
          value={message}
          textColor='red'
          style={screenStyles.textInput}
          theme={{
            roundness: 0
          }}
          onChangeText={e => setMessage(e)}
          enterKeyHint={'send'}
        />
        <TouchableOpacity style={screenStyles.sendBtn}
          onPress={sendMessage}
        >
          <Ionicons name='send-sharp' size={30} color={colorPalette.black} style={{ textAlign: 'center', alignSelf: 'center' }} />

        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default ChatBox