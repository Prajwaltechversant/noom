import {Alert, Modal, ModalProps, Pressable, TouchableOpacity, View} from 'react-native';
import React from 'react';
// import {
//   ModalProps,
// } from 'react-native-paper';
import {useScreenContext} from '../../../context/screenContext';
import styles from './style';
import { Text } from 'react-native';
import textStyle from '../../../style/text/style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
type Props = {
  children: React.ReactNode;
  setProgressModalVisible:(b:boolean)=>void
};

type ModalProp = Props & ModalProps;

const CustomModal = ({children, visible,setProgressModalVisible, ...props}: ModalProp) => {
  const containerStyle = {backgroundColor: 'red'};
  const screenContext = useScreenContext();
  const {width, height, isPortrait} = screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );

  return (
    <View style={screenStyles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setProgressModalVisible(!visible);
        }}
        
        >
        <View style={screenStyles.centeredView}>
          <View style={screenStyles.modalView}>
          < >
            <TouchableOpacity style={screenStyles.closeIconContainer}
            onPress={()=>{
              setProgressModalVisible(!visible);
            }}
            >
             <MaterialIcons name='arrow-drop-down' size={40} />
            </TouchableOpacity>
          </>
           <View style={{marginVertical:30}}>{children}</View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default CustomModal;
