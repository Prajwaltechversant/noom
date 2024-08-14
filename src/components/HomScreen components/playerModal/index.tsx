import {View, Modal, Text, Alert, Pressable} from 'react-native';
import React, {useState} from 'react';
// import {
//   Modal,
//   Portal,
//   Text,
//   Button,
//   PaperProvider,
//   ModalProps,
// } from 'react-native-paper';
import {useScreenContext} from '../../../context/screenContext';
import styles from './style';
import textStyle from '../../../style/text/style';
import {colorPalette} from '../../../assets/colorpalette/colorPalette';
import AntDesign from 'react-native-vector-icons/AntDesign';
type Props = {
  children: React.ReactNode;
};

// type ModalProp = Props & ModalProps;

const PlayerModal = ({modalVisble}) => {
  const [modalVisible, setModalVisible] = useState(modalVisble);

  const containerStyle = {backgroundColor: colorPalette.white};
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
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={screenStyles.centeredView}>
          <View style={screenStyles.modalView}>
            <Text style={screenStyles.modalText}>Hello World!</Text>
            <Pressable
              style={[screenStyles.button, screenStyles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={screenStyles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[screenStyles.button, screenStyles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={screenStyles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

export default PlayerModal;
