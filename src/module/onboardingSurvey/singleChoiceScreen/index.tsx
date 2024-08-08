import {View, Text} from 'react-native';
import React from 'react';
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
  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.contentContainer}>
        <Text style={textStyle.questionText} onPress={handleNext}>
          {section.question}
        </Text>
        {section.content && (
          <Text style={textStyle.labelText} onPress={handleNext}>
            {section.content}
          </Text>
        )}
        <View>
          {section.type === 'input' ? (
            <CustomTextInputComponent
              label={section.question}
              mode="outlined"
              right={<Text style={textStyle.labelText}>lb</Text>}
            />
          ) : section.type === 'dropdown' ? (
            <PaperDropdown />
          ) : section.type === 'date' ? (
            <DatePickerComponent />
          ) : null}
        </View>
        {section.extraContent && (
          <Text style={textStyle.labelText} onPress={handleNext}>
            {section.extraContent}
          </Text>
        )}
      </View>

      <View style={screenStyles.btnContainer}>
        <CustomButton
          btnWidth={width * 0.8}
          btnHeight={isPortrait ? width * 0.2 : width * 0.08}
          label={'Next'}
          btnColor={colorPalette.berry}
          onPress={handleNext}
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
