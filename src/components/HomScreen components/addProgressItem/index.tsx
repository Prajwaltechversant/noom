import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {useScreenContext} from '../../../context/screenContext';
import styles from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import textStyle from '../../../style/text/style';
import {Divider} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
interface Props {
  item: any;
}

type itemIcon = 'MaterialIcons';
const AddProgressItemComponent: React.FC<Props> = ({item}) => {
  const screenContext = useScreenContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const {width, height, isPortrait} = screenContext;
  const [end, setEnd] = useState(false);
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );

  const Icon = () => {
    if (item?.icon?.iconPack === 'MaterialIcons') {
      return <MaterialIcons name={item?.icon?.name} size={25} />;
    } else if (item?.icon?.iconPack === 'MaterialCommunityIcons') {
      return <MaterialCommunityIcons name={item?.icon?.name} size={25} />;
    } else {
      return <FontAwesome5 name={item?.icon?.name} size={25} />;
    }
  };
  console.log(item.icon.iconPack);
  return (
    <>
      <Divider />
      <View style={screenStyles.container}>
        <Icon />
        <Text style={textStyle.labelText}>{item?.title}</Text>
      </View>
      <Divider />
    </>
  );
};

export default AddProgressItemComponent;
