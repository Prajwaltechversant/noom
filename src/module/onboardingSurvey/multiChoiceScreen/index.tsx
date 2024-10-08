import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { color } from 'echarts';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import CustomButton from '../../../components/button/customButton';
import textStyle from '../../../style/text/style';
import { colorPalette } from '../../../assets/colorpalette/colorPalette';
import { useScreenContext } from '../../../context/screenContext';
import { Checkbox } from 'react-native-paper';
import { addData } from '../../../redux/slices/onBoardingAnswers';
import { useAppDispatch } from '../../../redux/hook';
import { staticVariables } from '../../../preferences/staticVariable';

export interface OnBoardProps {
  section: {
    content?: string;
    options: {
      label: string;
      key: boolean;
      value: string;
      id: string;
    }[];
    key: string;
    question: string;
    type: string;
    extraContent?: string;
    optional?: boolean;
    id: string;
    value: string
  };
  handleNext: () => void;
}

const ButtonGroupScreen: React.FC<OnBoardProps> = ({ section, handleNext }) => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait, isTabletType, scale } =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation: any = useNavigation();
  const [checked, setChecked] = React.useState([staticVariables.EMPTY_STRING]);
  const [checkedItem, setCheckedItem] = useState<any>(staticVariables.EMPTY_ARRAY);
  const [isPressed, setIsPressed] = useState(staticVariables.EMPTY_STRING);
  const [answer, setAnswer] = useState<undefined | string>(undefined);
  const dispatch = useAppDispatch();
  const qid = section?.id;


  useEffect(() => {
    let arr: any = [];
    if (section.type === 'checkbox') {
      section.options.forEach(i =>
        arr.push({ label: i.label, checked: false, id: i.id }),
      );
      setCheckedItem(arr);
    }
  }, []);
  const handleChecked = (item: string) => {
    let arr = [...checkedItem];
    let checkedId: any = [];
    arr.forEach((i, index) => {
      ``;
      if (i.label === item) {
        arr[index].checked = !i.checked;
      }
    });
    setCheckedItem(arr);
    arr.forEach(item => {
      if (item.checked) {
        checkedId.push(item.id);
      }
    });
    dispatch(addData({ qId: qid, aId: checkedId }));
  };
  return (
    <View style={screenStyles.container}>
      <Text style={textStyle.questionText}>{section.question}</Text>
      {section.content && (
        <Text
          style={[
            textStyle.labelText,
            screenStyles.contentText
          ]}>
          {section.content}
        </Text>
      )}
      <View style={screenStyles.optionContainer}>
        <FlatList
          data={section.options}
          key={section.key}
          keyExtractor={item => Math.random().toString(36).substring(2)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) =>
            section.type != 'checkbox' ? (
              <CustomButton
                btnWidth={screenContext.isPortrait ? width * 0.8 : width * 0.4}
                btnHeight={isPortrait ? width * 0.2 : width * 0.08}
                btnColor={
                  isPressed === item.label
                    ? colorPalette.pine
                    : colorPalette.sand
                }
                label={item.label}
                onPress={() => {
                  setIsPressed(item.label);
                  setAnswer(item.id);
                  if (section.type !== 'radio') {
                    dispatch(addData({ qId: qid, aId: item.id }));
                    handleNext();
                  }
                }}
                labelColor={
                  isPressed === item.label
                    ? colorPalette.white
                    : colorPalette.black
                }
                borderRadius={isPortrait ? width * 0.04 : height * 0.04}
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
          btnWidth={width * 0.4}
          btnHeight={isPortrait ? width * 0.2 : width * 0.08}
          label={'Next'}
          btnColor={colorPalette.berry}
          onPress={() => {
            if (section.type !== 'checkbox') {
              if (answer) {
                handleNext();
                dispatch(addData({ qId: qid, aId: answer }));
              }
            } else {
              handleNext();
            }
          }}
          labelColor={colorPalette.white}
          borderRadius={10}
        />
      )}
    </View>
  );
};

export default React.memo(ButtonGroupScreen);
