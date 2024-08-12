import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useScreenContext} from '../../../context/screenContext';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import textStyle from '../../../style/text/style';
import {addData} from '../../../redux/slices/onBoardingAnswers';
import { useAppDispatch } from '../../../redux/hook';

interface OnBoardProps {
  section: {
    content?: string;
    options: {
      label: string;
      key: boolean;
      value: string;
      id: string;
    }[];
    img?: string;
    key: string;
    question: string;
    type: string;
    optional: boolean;
    id: string;
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
  const qid = section.id;
  const dispatch = useAppDispatch()
  return (
    <View style={screenStyles.container}>
      <Text style={textStyle.questionText}>{section.question}</Text>
      <View style={screenStyles.contentContainer}>
        <Image source={{uri: section.img}} style={screenStyles.image} />
        <Text style={textStyle.questionText}>{section.content}</Text>
        <View style={screenStyles.optionContainer}>
          {section.options.map(i => (
            <TouchableOpacity
              style={screenStyles.box}
              onPress={() => {
                dispatch(addData({qId: qid, aId: i.id}));
                handleNext()
              }}
              key={Math.random().toString(36).substring(2)}>
              <Text style={textStyle.labelText}>{i.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default YesNoScreen;
