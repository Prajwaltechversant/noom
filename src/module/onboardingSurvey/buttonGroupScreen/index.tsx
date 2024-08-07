import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import {useScreenContext} from '../../../context/screenContext';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import CustomButton from '../../../components/button/customButton';
import textStyle from '../../../style/text/style';
import {colorPalette} from '../../../assets/colorpalette/colorPalette';
import {Button} from 'react-native-paper';

export interface Props {
  section: {
    content?: string;
    options: {
      label: string;
      key: boolean;
      value: string;
    }[];
    key: string;
    question: string;
  };
  handleNext: () => void;
}

const ButtonGroupScreen: React.FC<Props> = ({section,handleNext}) => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait, isTabletType, scale} =
    screenContext;

  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation: any = useNavigation();

  const [isPressed, setIsPressed] = useState('');
  return (
    <View style={screenStyles.container}>
      {section.content && <Text>{section.content}</Text>}
      <Text style={textStyle.questionText}>{section.question}</Text>
      <View style={screenStyles.optionContainer}>
        <FlatList
          data={section.options}
          renderItem={({item}) => (
            <CustomButton
              btnWidth={width * 0.8}
              btnHeight={isPortrait ? width * 0.2 : width * 0.08}
              btnColor={
                isPressed === item.label ? colorPalette.pine : colorPalette.sand
              }
              label={item.label}
              onPress={() => {
                setIsPressed(item.label);
                handleNext()
              }}
              labelColor={
                isPressed === item.label
                  ? colorPalette.white
                  : colorPalette.black
              }
            />
          )}
        />
      </View>
    </View>
  );
};

export default ButtonGroupScreen;
