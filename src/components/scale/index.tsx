
import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useScreenContext } from '../../context/screenContext';
import styles from './style';
import textStyle from '../../style/text/style';


interface Props {
  minValue: number,
  maxValue: number,
  setSelectedScaleValue: Dispatch<SetStateAction<number>>
  selectedScaleValue: number
}

const CustomScale: React.FC<Props> = ({ minValue, maxValue, setSelectedScaleValue, selectedScaleValue }) => {

  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait, isTabletType, scale } =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const [selectedValue, setSelectedValue] = useState(minValue);
  const scrollViewRef = useRef<ScrollView>(null);

  const generateScale = () => {
    const scale = [];
    for (let i = minValue; i <= maxValue; i++) {
      scale.push(i);
    }
    return scale;
  };
  const scaleItems = generateScale();
  // console.log(scaleItems)

  const handleScroll = (e: any) => {
    const xOffset = e.nativeEvent.contentOffset.x;
    // console.log(xOffset)
    const itemWidth = width / 5;
    const index = Math.round(xOffset / itemWidth);
    const newValue = scaleItems[index];
    // console.log(index, 'saf')
    if (newValue !== selectedScaleValue) {
      setSelectedScaleValue(newValue);
    }
  };

  const scrollToValue = (value: any) => {
    const itemWidth = width / 5;
    const index = scaleItems.indexOf(value);
    if (index !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: index * itemWidth, animated: true });
    }
  };
  useEffect(() => {
    scrollToValue(minValue);
  }, []);

  return (
    <>
      <Text style={textStyle.labelText}>Scroll the Scale to log Value</Text>
      <View style={screenStyles.container}>
        <View style={screenStyles.pointerContainer}>
          <View style={screenStyles.pointer}></View>
        </View>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={screenStyles.scaleContainer}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          snapToInterval={width / 5}
          decelerationRate="fast"
        >
          {scaleItems.map((value, index) => (
            <View key={index} style={screenStyles.markerContainer}
            >
              <Text style={textStyle.labelText}>{value}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};


export default CustomScale;
