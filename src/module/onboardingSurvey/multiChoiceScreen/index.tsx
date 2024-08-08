import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useScreenContext} from '../../../context/screenContext';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import CustomButton from '../../../components/button/customButton';
import textStyle from '../../../style/text/style';
import {colorPalette} from '../../../assets/colorpalette/colorPalette';
import {Button} from 'react-native-paper';
import {Checkbox} from 'react-native-paper';

export interface OnBoardProps {
  section: {
    content?: string;
    options: {
      label: string;
      key: boolean;
      value: string;
    }[];
    key: string;
    question: string;
    type: string;
    extraContent?: string;
    optional?: boolean;
  };
  handleNext: () => void;
}

const ButtonGroupScreen: React.FC<OnBoardProps> = ({section, handleNext}) => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait, isTabletType, scale} =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation: any = useNavigation();
  const [checked, setChecked] = React.useState(['']);
  const [checkedItem, setCheckedItem] = useState<any>([]);
  const [isPressed, setIsPressed] = useState('');

  useEffect(() => {
    let arr: any = [];
    if (section.type === 'checkbox') {
      section.options.forEach(i => arr.push({label: i.label, checked: false}));
      setCheckedItem(arr);
    }
  }, []);

  const handleChecked = (item: string) => {
    let arr = [...checkedItem];
    arr.forEach((i, index) => {
      if (i.label === item) {
        arr[index].checked = !i.checked;
      }
    });
    setCheckedItem(arr);
  };
  return (
    <View style={screenStyles.container}>
      <Text style={textStyle.questionText}>{section.question}</Text>
      {section.content && (
        <Text style={textStyle.labelText}>{section.content}</Text>
      )}
      <View style={screenStyles.optionContainer}>
        <FlatList
          data={section.options}
          key={section.key}
          renderItem={({item, index}) =>
            section.type != 'checkbox' ? (
              <CustomButton
                btnWidth={width * 0.8}
                btnHeight={isPortrait ? width * 0.2 : width * 0.08}
                btnColor={
                  isPressed === item.label
                    ? colorPalette.pine
                    : colorPalette.sand
                }
                label={item.label}
                onPress={() => {
                  setIsPressed(item.label);
                  if (section.type !== 'radio') handleNext();
                }}
                labelColor={
                  isPressed === item.label
                    ? colorPalette.white
                    : colorPalette.black
                }
                leftIcon={section.type === 'radio' ? true : false}
              />
            ) : (
              <View
                style={[
                  screenStyles.checkBoxContainer,
                  {
                    backgroundColor:
                      checkedItem.length > 0
                        ? checkedItem[index]?.checked
                          ? colorPalette.gold
                          : colorPalette.sand
                        : colorPalette.gold,
                  },
                ]}>
                <Checkbox
                  status={
                    checkedItem.length > 0
                      ? checkedItem[index]?.checked
                        ? 'checked'
                        : 'unchecked'
                      : 'unchecked'
                  }
                  onPress={() => {
                    handleChecked(item.label);
                  }}
                />
                <Text
                  style={[
                    textStyle.labelText,
                    {
                      color: checkedItem[index]?.checked
                        ? colorPalette.white
                        : colorPalette.black,
                    },
                  ]}>
                  {item.label}
                </Text>
              </View>
            )
          }
        />
      </View>
      {section.type !== 'button' && (
        <CustomButton
          btnWidth={width * 0.8}
          btnHeight={isPortrait ? width * 0.2 : width * 0.08}
          label={'Next'}
          btnColor={colorPalette.berry}
          onPress={handleNext}
        />
      )}
    </View>
  );
};

export default ButtonGroupScreen;
