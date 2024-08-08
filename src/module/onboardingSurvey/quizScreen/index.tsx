import {View, Text} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useScreenContext} from '../../../context/screenContext';
import styles from './style';
import textStyle from '../../../style/text/style';
import CustomButton from '../../../components/button/customButton';
import Slider from '@react-native-community/slider';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const QuizScreen: React.FC = () => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait, isTabletType, scale} =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const data = [0];

  const [sliderValue, setSliderValue] = useState(0.5);
  const viewRef = useRef(null);
  const tabWidth = width * 0.8;
  const translateX = useSharedValue(tabWidth/2);
console.log(tabWidth/2)
  const gesture = Gesture.Pan()
    .onStart(({y,translationX}) => {
      translateX.value = translationX;
    })
    .onUpdate(({y, translationX}) => {
      translateX.value = translationX;
    })
    .onEnd(({y, translationX}) => {
      translateX.value = translationX;
      console.log(tabWidth/4)
      console.log(translationX)
      if(tabWidth/4>translationX && tabWidth/6<translationX){
        translateX.value = tabWidth/4
      }else if (tabWidth/6>translationX && tabWidth/8<translationX){
        translateX.value = tabWidth/8
      }
      
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  return (
    <View style={screenStyles.container}>
      <Text style={textStyle.headingText}>QuizScreen</Text>

      <View style={screenStyles.contentContainer}>
        <Text style={textStyle.questionText}>i want to ...</Text>

        <View style={screenStyles.optionContainer}>
          <View style={screenStyles.options}>
            <View style={screenStyles.optionBox}></View>
            <View style={screenStyles.optionSeparator}>
              <View style={screenStyles.seperatorBar}></View>
              <Text style={{color: 'red', fontSize: 20}}>Or</Text>
              <View style={screenStyles.seperatorBar}></View>
            </View>
            <View style={screenStyles.optionBox}></View>
          </View>

          <View style={screenStyles.sliderView}>
            <GestureHandlerRootView>
              <GestureDetector gesture={gesture}>
                <View ref={viewRef} style={screenStyles.sliderView}>
                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: 'yellow',
                      width: width * 0.8,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text style={textStyle.labelText}>1</Text>
                    <Text style={textStyle.labelText}>2</Text>
                    <Animated.View style={[animatedStyles]}>
                      <Text style={[textStyle.labelText]}>0</Text>
                    </Animated.View>
                    <Text style={textStyle.labelText}>2</Text>
                    <Text style={textStyle.labelText}>2</Text>
                  </View>
                </View>
              </GestureDetector>
            </GestureHandlerRootView>

            {/* <Slider
              style={{width: 250, height: 10}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="black"
              maximumTrackTintColor="red"
              value={sliderValue}
              onValueChange={value => setSliderValue(value)}
              renderStepNumber
            /> */}
          </View>
        </View>

        <CustomButton
          btnColor="red"
          btnHeight={width * 0.2}
          btnWidth={width * 0.8}
          label="Next"
        />
        {/* <View>
          <Text
            numberOfLines={3}
            style={[textStyle.labelText, {textAlign: 'center'}]}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum,
            modi saepe expedita architecto atque placeat laborum minus
            voluptates alias ut ipsum quis mollitia. Illo, blanditiis. Quidem
            assumenda architecto corrupti autem?
          </Text>
        </View> */}
      </View>
    </View>
  );
};

export default QuizScreen;
