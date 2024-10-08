import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { TextInput } from 'react-native-paper';
import { useScreenContext } from '../../../context/screenContext';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colorPalette } from '../../../assets/colorpalette/colorPalette';
import CustomTextInputComponent from '../../textInput';
import { staticVariables } from '../../../preferences/staticVariable';
import styles from './style';


interface Props {
  setMessage: Dispatch<SetStateAction<string>>,
  sendMessage: () => void,
  message: string,
  isMessageSending: boolean
}

const ChatBox: React.FC<Props> = ({ setMessage, sendMessage, message, isMessageSending }) => {
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
          label={staticVariables.EMPTY_STRING}
          value={isMessageSending ? '' : message}
          textColor='red'
          style={screenStyles.textInput}
          theme={{
            roundness: 9
          }}
          onChangeText={e => {
            if (!e.startsWith(' ')) {
              setMessage(e)
            }
          }}
          enterKeyHint={'send'}
        />
        <TouchableOpacity style={screenStyles.sendBtn}
          disabled={isMessageSending ? true : false}
          onPress={sendMessage}
        >
          <Ionicons name='send-sharp' size={30} color={colorPalette.black} style={{ textAlign: 'center', alignSelf: 'center' }} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default ChatBox