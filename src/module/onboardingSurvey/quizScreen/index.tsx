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
  withSpring,
} from 'react-native-reanimated';
import Entypo from 'react-native-vector-icons/Entypo';
import { OnBoardProps } from '../multiChoiceScreen';
const QuizScreen: React.FC<OnBoardProps> = ({handleNext,section}) => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait, isTabletType, scale} =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const viewRef = useRef(null);
  const tabWidth = width * 0.8;
  const sliderPositions = [
    0 - tabWidth / 2,
    0 - tabWidth / 4,
    0,
    tabWidth / 4,
    tabWidth / 2,
  ];
  console.log(sliderPositions);
  const translateX = useSharedValue(sliderPositions[4]);
  console.log(tabWidth / 2);
  const gesture = Gesture.Pan()
    .onUpdate(({y, translationX}) => {
      translateX.value = translationX;
    })
    .onEnd(({y, translationX}) => {
      const closestValue = withSpring(
        sliderPositions.sort((a, b) => {
          return Math.abs(a - translationX) - Math.abs(b - translationX);
        })[0],
      );
      translateX.value = closestValue;
    });

  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.contentContainer}>
        <Text style={textStyle.questionText}>i want to ...</Text>
        <View style={screenStyles.optionContainer}>
          <View style={screenStyles.options}>
            <View style={screenStyles.optionBox}>
              <Text style={textStyle.questionText}>{section.options[0].label}</Text>
            </View>
            <View style={screenStyles.optionSeparator}>
              <View style={screenStyles.seperatorBar}></View>
              <Text style={{color: 'red', fontSize: 20}}>Or</Text>
              <View style={screenStyles.seperatorBar}></View>
            </View>
            <View style={screenStyles.optionBox}>
            <Text style={textStyle.questionText}>{section.options[1].label}</Text>
            </View>
          </View>
        </View>
        <View ref={viewRef} style={screenStyles.sliderView}>
          <View style={screenStyles.answerContainer}>
            <Text
              style={[
                textStyle.labelText,
                {textAlign: 'center'},
              ]}>{`Agree \n Most`}</Text>
            <Text
              style={[
                textStyle.labelText,
                {textAlign: 'center'},
              ]}>{`Agree a \nlittle more`}</Text>
            <Text
              style={[
                textStyle.labelText,
                {textAlign: 'center', color: 'white'},
              ]}>
              center
            </Text>
            <Text
              style={[
                textStyle.labelText,
                {textAlign: 'center'},
              ]}>{`Agree a\n little more`}</Text>
            <Text
              style={[
                textStyle.labelText,
                {textAlign: 'center'},
              ]}>{`Agree\n most`}</Text>
          </View>

          <GestureHandlerRootView>
            <GestureDetector gesture={gesture}>
              <Animated.View
                style={[
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: tabWidth,
                    transform: [{translateX}],
                    height: tabWidth * 0.2,
                  },
                ]}>
                <Animated.View style={screenStyles.dragIcon}>
                  <Entypo name="circle" color={'red'} size={30} />
                </Animated.View>
              </Animated.View>
            </GestureDetector>
          </GestureHandlerRootView>
        </View>
      </View>

      <CustomButton
        btnColor="red"
        btnHeight={width * 0.2}
        btnWidth={width * 0.8}
        label="Next"
        onPress={handleNext}
      />
      <View style={screenStyles.hintContainer}>
        <Text
          numberOfLines={2}
          style={[textStyle.labelText, {textAlign: 'center'}]}>
          Drag the circle towards the statement you agree with most
        </Text>
        <Text
          numberOfLines={3}
          style={[textStyle.labelText, {textAlign: 'center'}]}>
          If both fit, choose one you agree with more. if neither fit,choose the
          one you're agree closest to agreeing with
        </Text>
      </View>
    </View>
  );
};

export default QuizScreen;
