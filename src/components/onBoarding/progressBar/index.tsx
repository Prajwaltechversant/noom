import {View, Text, Animated, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from 'react';
import textStyle from '../../../style/text/style';
import Slider from '@react-native-community/slider';
import {useScreenContext} from '../../../context/screenContext';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colorPalette} from '../../../assets/colorpalette/colorPalette';
interface Props {
  totalValue: number;
  progress: number;
  handlePrev: () => void;
  duration: number;
  sectionTitle: string;
}

const OnBoardingProgressBar: React.FC<Props> = ({
  progress,
  totalValue,
  handlePrev,
  duration = 500,
  sectionTitle,
}) => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait, isTabletType, scale} =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: duration,
      useNativeDriver: false,
    }).start();
  }, [progress]);


  const interploatedWidth = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.progressBarHeader}>
        <TouchableOpacity onPress={handlePrev}>
          <Ionicons name="arrow-back" color={colorPalette.black} size={25} />
        </TouchableOpacity>
        <Text style={textStyle.labelText}>{sectionTitle}</Text>
      </View>
      <View style={screenStyles.animatedContainer}>
        <Animated.View
          style={[screenStyles.fill, {width: interploatedWidth}]}
        />
      </View>
    </View>
  );
};

export default OnBoardingProgressBar;
