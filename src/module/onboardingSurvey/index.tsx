import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useDispatch} from 'react-redux';
import {onBoardingData} from '../../services/dataSet';
import {Button} from 'react-native-paper';
import textStyle from '../../style/text/style';
import CustomButton from '../../components/button/customButton';
import {useScreenContext} from '../../context/screenContext';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import ButtonGroupScreen from './buttonGroupScreen';

export type FormType = 'button' | 'input' | 'radio' | 'yesno' | 'checkbox';
const OnboardingScreen = () => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait, isTabletType, scale} =
    screenContext;

  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation: any = useNavigation();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

  const [section, setSection] = useState<any>(
    onBoardingData[currentSectionIndex].screens[currentScreenIndex],
  );

  const [types, setTypes] = useState<string[]>();
  useEffect(() => {
    let arr: string[] = [];
    onBoardingData.forEach(i => i.screens.forEach(i => arr.push(i.type)));
    setTypes(arr);
  }, []);
  const handleNext = () => {
    const currentSection = onBoardingData[currentSectionIndex];
    const nextScreenIndex = currentScreenIndex + 1;
    if (nextScreenIndex < currentSection.screens.length) {
      setCurrentScreenIndex(nextScreenIndex);
      setSection(currentSection.screens[nextScreenIndex]);
    } else {
      const nextSectionIndex = currentSectionIndex + 1;
      if (nextSectionIndex < onBoardingData.length) {
        setCurrentSectionIndex(nextSectionIndex);
        setCurrentScreenIndex(0);
      } else {
        console.log('Onboarding complete');
      }
    }
  };

  switch (section.type) {
    case 'button':
      return (
        <>
        <Text>Progress bar</Text>
        <ButtonGroupScreen section={section} handleNext={handleNext} />
        </>
      );
    case 'radio':
      return (
        <View>
          <Button onPress={handleNext} textColor="black">
            Next
          </Button>
          <Text style={textStyle.headingText}>{section.type}</Text>
          <Text style={textStyle.headingText} onPress={handleNext}>
            {section.question}
          </Text>
        </View>
      );
    case 'yesno':
      return (
        <View>
          <Button onPress={handleNext} textColor="black">
            Next
          </Button>
          <Text style={textStyle.headingText}>{section.type}</Text>
          <Text style={textStyle.headingText} onPress={handleNext}>
            {section.question}
          </Text>
        </View>
      );
    case 'quiz':
      return (
        <View>
          <Button onPress={handleNext} textColor="black">
            Next
          </Button>
          <Text style={textStyle.headingText}>{section.type}</Text>
          <Text style={textStyle.headingText} onPress={handleNext}>
            {section.question}
          </Text>
        </View>
      );

    case 'input':
      return (
        <View>
          <Button onPress={handleNext} textColor="black">
            Next
          </Button>
          <Text style={textStyle.headingText}>{section.type}</Text>
          <Text style={textStyle.headingText} onPress={handleNext}>
            {section.question}
          </Text>
        </View>
      );

    case 'checkbox':
      return (
        <View>
          <Button onPress={handleNext} textColor="black">
            Next
          </Button>
          <Text style={textStyle.headingText}>{section.type}</Text>
          <Text style={textStyle.headingText} onPress={handleNext}>
            {section.question}
          </Text>
        </View>
      );

    case 'date':
      return (
        <View>
          <Button onPress={handleNext} textColor="black">
            Next
          </Button>
          <Text style={textStyle.headingText}>{section.type}</Text>
          <Text style={textStyle.headingText} onPress={handleNext}>
            {section.question}
          </Text>
        </View>
      );

    default:
      return (
        <View style={{alignItems: 'center'}}>
          <Button onPress={handleNext} textColor="black">
            Next
          </Button>

          <Text style={textStyle.headingText}>{currentSectionIndex}</Text>

          <Text style={textStyle.headingText}>{currentScreenIndex}</Text>

          {/* <Text style={textStyle.headingText}>{section.question}</Text> */}
        </View>
      );
  }

  // console.log(section)
};
export default OnboardingScreen;
