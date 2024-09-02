import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { useScreenContext } from '../../../context/screenContext';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import textStyle from '../../../style/text/style';
import CustomTextInputComponent from '../../../components/textInput';
import CustomButton from '../../../components/button/customButton';
import { colorPalette } from '../../../assets/colorpalette/colorPalette';
import PaperDropdown from '../../../components/dropdown';
import DatePickerComponent from '../../datePicker';
import { OnBoardProps } from '../multiChoiceScreen';
import { addData } from '../../../redux/slices/onBoardingAnswers';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { showMessage } from 'react-native-flash-message';
import FlashMessage from "react-native-flash-message";
import { staticVariables } from '../../../preferences/staticVariable';


const SingleChoiceScreen: React.FC<OnBoardProps> = ({ handleNext, section }) => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait, isTabletType, scale } =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation: any = useNavigation();
  const [answer, setAnswer] = useState<any>(undefined);
  const dispatch = useAppDispatch();
  const qid = section.id;
  const currentUid = auth().currentUser?.uid;
  const data = useAppSelector(state => state.onBoarding)


  const handleAnswer = async () => {
    if (answer) {
      if (qid === 'name') auth().currentUser?.updateProfile({ displayName: answer })
      if (qid === 'idealWeight') {
        if (Number(answer) < Number(data.userWeight)) {
          dispatch(addData({ qId: qid, aId: answer }));
          setAnswer(staticVariables.EMPTY_STRING);
          handleNext();
        } else {
          showMessage({
            message: "Please Confirm your weight",
            description: "Ideal Weight must be less than current weight",
            type: "warning",
          });
        }
      } else {
        dispatch(addData({ qId: qid, aId: answer }));
        setAnswer(staticVariables.EMPTY_STRING);
        handleNext();
      }
    }
  }

  return (
    <View style={screenStyles.container}>
      <FlashMessage position="top" />

      <View style={screenStyles.contentContainer}>
        <Text style={textStyle.questionText}>{section.question}</Text>
        {section.content && (
          <Text style={textStyle.labelText}>{section.content}</Text>
        )}
        <View>
          {section.type === 'input' ? (
            <CustomTextInputComponent
              textColor='black'
              label={section.question}
              mode="outlined"
              value={answer}
              inputMode={section.value === 'number' ? 'numeric' : section.value === 'email' ? 'email' : 'text'}
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
          btnWidth={width * 0.4}
          btnHeight={isPortrait ? width * 0.1 : width * 0.08}
          label={'Next'}
          btnColor={colorPalette.berry}
          onPress={() => {
            handleAnswer()
          }}
          borderRadius={10}
          labelColor='white'
        />

        {section.optional && (
          <CustomButton
            btnWidth={width * 0.4}
            btnHeight={isPortrait ? width * 0.1 : width * 0.08}
            label={'Skip'}
            btnColor={colorPalette.Lagoon}
            onPress={handleNext}
            borderRadius={10}
            labelColor='white'

          />
        )}
      </View>
    </View>
  );
};

export default React.memo(SingleChoiceScreen);
