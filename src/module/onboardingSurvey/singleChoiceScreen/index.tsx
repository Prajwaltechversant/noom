import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {useScreenContext} from '../../../context/screenContext';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import textStyle from '../../../style/text/style';
import CustomTextInputComponent from '../../../components/textInput';
import CustomButton from '../../../components/button/customButton';
import {colorPalette} from '../../../assets/colorpalette/colorPalette';
import PaperDropdown from '../../../components/dropdown';
import DatePickerComponent from '../../datePicker';
import {OnBoardProps} from '../multiChoiceScreen';
import {addData} from '../../../redux/slices/onBoardingAnswers';
import { useAppDispatch } from '../../../redux/hook';

const SingleChoiceScreen: React.FC<OnBoardProps> = ({handleNext, section}) => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait, isTabletType, scale} =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation: any = useNavigation();
  const [answer, setAnswer] = useState<any>(undefined);

  const dispatch = useAppDispatch()
  const qid = section.id;

  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.contentContainer}>
        <Text style={textStyle.questionText}>{section.question}</Text>
        {section.content && (
          <Text style={textStyle.labelText}>{section.content}</Text>
        )}
        <View>
          {section.type === 'input' ? (
            <CustomTextInputComponent
              label={section.question}
              mode="outlined"
              right={<Text style={textStyle.labelText}>lb</Text>}
              onChangeText={e => setAnswer(e)}
            />
          ) : section.type === 'dropdown' ? (
            <PaperDropdown />
          ) : section.type === 'date' ? (
            <DatePickerComponent setAnswer={setAnswer} />
          ) : null}
        </View>
        {section.extraContent && (
          <Text style={textStyle.labelText}>{section.extraContent}</Text>
        )}
      </View>

      <View style={screenStyles.btnContainer}>
        <CustomButton
          btnWidth={width * 0.8}
          btnHeight={isPortrait ? width * 0.2 : width * 0.08}
          label={'Next'}
          btnColor={colorPalette.berry}
          onPress={() => {
            if (answer) {
              dispatch(addData({qId: qid, aId: answer}));
              handleNext();
            }
          }}
        />

        {section.optional && (
          <CustomButton
            btnWidth={width * 0.8}
            btnHeight={isPortrait ? width * 0.2 : width * 0.08}
            label={'Skip'}
            btnColor={colorPalette.berry}
            onPress={handleNext}
          />
        )}
      </View>
    </View>
  );
};

export default SingleChoiceScreen;
