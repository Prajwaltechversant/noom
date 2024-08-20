import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../../context/screenContext';
import textStyle from '../../../style/text/style';
import {colorPalette} from '../../../assets/colorpalette/colorPalette';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

interface Props {
  day: string;
  isSelected: boolean;
  setSelctedDate: (str: string) => void;
  handleSelectedTimeStamp: () => void;
}

const DayItem: React.FC<Props> = ({
  day,
  isSelected,
  setSelctedDate,
  handleSelectedTimeStamp,
}) => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait, isTabletType, scale} =
    screenContext;

  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation: any = useNavigation();
  const handleSelection = () => {
    handleSelectedTimeStamp();
    setSelctedDate(day);
  };
  return (
    <TouchableOpacity
      style={[
        screenStyles.container,
        {backgroundColor: isSelected ? colorPalette.cinnamon : colorPalette.gold},
      ]}
      onPress={handleSelection}>
      <View
        style={[
          screenStyles.innerCircle,
          {
            backgroundColor: isSelected ? colorPalette.stream :colorPalette.white,
          },
        ]}>
        <Text style={{color: isSelected ? 'white' : 'black'}}>
          {day.slice(0, 1)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DayItem;
