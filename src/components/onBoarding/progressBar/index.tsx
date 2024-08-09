import {View, Text} from 'react-native';
import React from 'react';
import textStyle from '../../../style/text/style';
import Slider from '@react-native-community/slider';

interface Props{
    totalValue:number;
    progress:number
}

const OnBoardingProgressBar:React.FC<Props> = ({progress,totalValue}) => {
    console.log(progress,'dsdsd')
  return (
    <View>
      <Text style={textStyle.questionText}>onBoardingProgressBar</Text>
      <Slider
        style={{width: 200, height: 40}}
        value={progress}
        minimumValue={0}
        maximumValue={totalValue}
        minimumTrackTintColor="red"
        maximumTrackTintColor="yellow"
        thumbTintColor="transparent"
        // disabled
        
      />
    </View>
  );
};

export default OnBoardingProgressBar;
