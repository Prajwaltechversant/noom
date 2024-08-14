import {View} from 'react-native';
import React from 'react';
import {
  Modal,
  Portal,
  Text,
  Button,
  PaperProvider,
  ModalProps,
} from 'react-native-paper';
import {useScreenContext} from '../../../context/screenContext';
import styles from './style';

type Props = {
  children: React.ReactNode;
};

type ModalProp = Props & ModalProps;

const CustomComponentModal = ({children, visible, ...props}: ModalProp) => {
  const [visibleModal, setVisibleModal] = React.useState(false);

  const showModal = () => setVisibleModal(visible);
  const hideModal = () => setVisibleModal(false);
  const containerStyle = {backgroundColor: 'red'};
  const screenContext = useScreenContext();
  const {width, height, isPortrait} = screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  return (
    <PaperProvider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={[containerStyle, {padding: 2}]}>
          <View style={{height, width, zIndex: 1}}>{children}</View>
        </Modal>
      </Portal>
    </PaperProvider>
  );
};

export default CustomComponentModal;
