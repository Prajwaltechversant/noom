import {Alert, Modal, ModalProps, Pressable, View} from 'react-native';
import React from 'react';
// import {
//   ModalProps,
// } from 'react-native-paper';
import {useScreenContext} from '../../../context/screenContext';
import styles from './style';
import { Text } from 'react-native';

type Props = {
  children: React.ReactNode;
};

type ModalProp = Props & ModalProps;

const CustomModal = ({children, visible, ...props}: ModalProp) => {
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
          Alert.alert('Modal has been closed.');
          // setModalVisible(!modalVisible);
        }}
        
        >
        <View style={screenStyles.centeredView}>
          <View style={screenStyles.modalView}>
           {children}
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default CustomModal;
