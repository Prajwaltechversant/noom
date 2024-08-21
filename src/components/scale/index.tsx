import { View, Text, FlatList, ScrollView, NativeScrollEvent, TouchableOpacity, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import { useScreenContext } from '../../context/screenContext';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import textStyle from '../../style/text/style';
import { NativeSyntheticEvent } from 'react-native';
import { colorPalette } from '../../assets/colorpalette/colorPalette';
import Animated, { useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';


const Scale: React.FC = () => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait } = screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );

  const wrapperRef = useRef(null)
  const navigation: any = useNavigation();
  const scaleRef = useRef<FlatList>(null)


  const aref = useAnimatedRef<Animated.ScrollView>();
  const scrollHandler = useScrollViewOffset(aref);
  const [pointerPosition, setPointerPosition] = useState(0)
  // console.log(wrapperRef.current)

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    console.log(e.nativeEvent.layoutMeasurement.height)
  }
  useAnimatedStyle(() => {
    console.log(scrollHandler.value / 10);
    // console.log(aref.caller)
    return {};
  });
  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.scaleWrapper}
        ref={wrapperRef}
      >
        <FlatList
          data={Array(100)}
          horizontal
          ref={scaleRef}
          onScroll={handleScroll}
          contentContainerStyle={{ backgroundColor: colorPalette.btnPrimary }}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={screenStyles.innerWrapper}
              key={index}
              onPress={() => Alert.alert(index.toString())}
            >
              <Text>{index}</Text>
            </TouchableOpacity>
          )}
          centerContent
          accessible

        />
        {/* <Animated.ScrollView

          horizontal
          ref={aref}
          style={screenStyles.scrollView}>
          {[...Array(100)].map((_, i) => (
          <View style={{width:60,height:60,borderWidth:1}}>
              <Text key={i} style={textStyle.errorText}>
                {i}
              </Text>
          </View>
          ))}
        </Animated.ScrollView> */}
      </View>
    </View>
  );
};

export default Scale;
