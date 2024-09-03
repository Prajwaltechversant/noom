import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useScreenContext } from '../../../../context/screenContext';
import { useNavigation } from '@react-navigation/native';
import Scale from '../../../../components/scale';
import CustomScale from '../../../../components/scale';
import { Image } from 'react-native';
import CustomButton from '../../../../components/button/customButton';
import { colorPalette } from '../../../../assets/colorpalette/colorPalette';
import { addToDailyProgress2 } from '../../../../services/dailyprogress';
import styles from './style';
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
  const navigation = useNavigation();
  const [selectedScaleValue, setSelectedScaleValue] = useState(0)
  const handleSave = () => {
    if (selectedScaleValue > 0) {
      addToDailyProgress2(item, selectedScaleValue)
      navigation.goBack()
    }
  }

  return (
    <ScrollView style={screenStyles.container} contentContainerStyle={{ alignItems: 'center' }}>
      <View style={screenStyles.headerContainer}>
        <Image source={{ uri: item.image }} style={screenStyles.headerImage} />
        <Text style={[screenStyles.goalText,]}>{item.title}</Text>
      </View>
      <View style={screenStyles.scaleView}>
        <CustomScale
          setSelectedScaleValue={setSelectedScaleValue}
          selectedScaleValue={selectedScaleValue}
          minValue={item?.level?.min}
          maxValue={item?.level?.max}
        />
        <View style={screenStyles.resultContainer}>
          <Text style={screenStyles.goalText}>Logged Value : {selectedScaleValue} {item?.level?.unit} </Text>
        </View>
      </View>

      <View style={screenStyles.btnConatiner}>
        <CustomButton
          label='Save'
          btnColor={colorPalette.btnPrimary}
          btnWidth={width * 0.3}
          btnHeight={height * 0.1}
          borderRadius={20}
          onPress={handleSave}

        />
      </View>
    </ScrollView>
  );
};

export default LogWeightScreen;
