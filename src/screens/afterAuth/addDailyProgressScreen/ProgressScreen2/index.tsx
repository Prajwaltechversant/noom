import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { useScreenContext } from '../../../../context/screenContext';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import Scale from '../../../../components/scale';
import CustomScale from '../../../../components/scale';
import { Image } from 'react-native';
import CustomButton from '../../../../components/button/customButton';
import { colorPalette } from '../../../../assets/colorpalette/colorPalette';
import { addToDailyProgress2 } from '../../../../services/dailyprogress';
interface Props {
  item: any;
  category: string;
}
const LogWeightScreen: React.FC<Props> = ({ category, item }) => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait } = screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation: any = useNavigation();
  const [selectedScaleValue, setSelectedScaleValue] = useState(0)
  const handleSave = () => {
    addToDailyProgress2(item, selectedScaleValue)
  }

  console.log(item)
  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.headerContainer}>
        <Image source={{ uri: item.image }} height={width * 0.08} width={width * 0.08} resizeMode='center' />
        <Text style={[screenStyles.goalText,]}>{item.title}</Text>
      </View>
      <View style={screenStyles.scaleView}>
        <CustomScale
          setSelectedScaleValue={setSelectedScaleValue}
          selectedScaleValue={selectedScaleValue}
          minValue={item?.level?.min}
          maxValue={item?.level?.max}
          step={1}
        />
        <View style={screenStyles.resultContainer}>
          <Text style={screenStyles.goalText}>Logged Value : {selectedScaleValue} {item?.level?.unit} </Text>
        </View>
      </View>


      <View style={screenStyles.btnConatiner}>
        <CustomButton
          label='Save'
          btnColor={colorPalette.btnPrimary}
          btnWidth={width * 0.8}
          btnHeight={height * 0.07}
          borderRadius={20}
          onPress={handleSave}

        />
      </View>
    </View>
  );
};

export default LogWeightScreen;
