import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../../context/screenContext';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import textStyle from '../../../style/text/style';

interface OnBoardProps {
  section: {
    content?: string;
    options: {
      label: string;
      key: boolean;
      value: string;
    }[];
    img?: string;
    key: string;
    question: string;
    type: string;
    optional:boolean
  };
  handleNext: () => void;
}
const YesNoScreen: React.FC<OnBoardProps> = ({section, handleNext}) => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait, isTabletType, scale} =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  return (
    <View style={screenStyles.container}>
      <Text style={textStyle.questionText}>{section.question}</Text>
      <View style={screenStyles.contentContainer}>
        <Image source={{uri: section.img}} style={screenStyles.image} />
        <Text style={textStyle.questionText}>{section.content}</Text>
        <View style={screenStyles.optionContainer}>
          {section.options.map(i => (
            <TouchableOpacity style={screenStyles.box} onPress={handleNext}>
              <Text style={textStyle.labelText}>{i.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default YesNoScreen;
