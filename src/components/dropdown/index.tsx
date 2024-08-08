import {View, Text} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../context/screenContext';
import styles from './style';
import {Button, Menu, Divider, PaperProvider} from 'react-native-paper';

const PaperDropdown: React.FC = () => {


  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait, isTabletType, scale} =
    screenContext;

  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  return (
    <PaperProvider>
    <View
      style={{
        paddingTop: 50,
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu} textColor='red'>Show menu</Button>}>
        <Menu.Item onPress={() => {}} title="Item 1" />
        <Menu.Item onPress={() => {}} title="Item 2" />
        <Divider />
        <Menu.Item onPress={() => {}} title="Item 3" />
      </Menu>
    </View>
  </PaperProvider>
  );
};

export default PaperDropdown;
