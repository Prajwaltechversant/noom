import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useDispatch} from 'react-redux';
// import {onBoardingData} from '../../../services/dataSet';
import {ActivityIndicator, Button} from 'react-native-paper';
import textStyle from '../../../style/text/style';
import CustomButton from '../../../components/button/customButton';
import {useScreenContext} from '../../../context/screenContext';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import ButtonGroupScreen from '../../../module/onboardingSurvey/multiChoiceScreen';
import YesNoScreen from '../../../module/onboardingSurvey/yesnoScreen';
import SingleChoiceScreen from '../../../module/onboardingSurvey/singleChoiceScreen';
import QuizScreen from '../../../module/onboardingSurvey/quizScreen';
import {fetchSurvey} from '../../../services/apis';
import firestore from '@react-native-firebase/firestore';
import OnBoardingProgressBar from '../../../components/onBoarding/progressBar';
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
  const [surveyData, setSurveyData] = useState<any>([]);
  const [section, setSection] = useState<any>();
  const [types, setTypes] = useState<string[]>();
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [progress, setProgress] = useState(0);
  const getData = async () => {
    firestore()
      .collection('survey')
      .get()
      .then((item): any => {
        let arr: any = [];
        let t = 0;
        item.forEach(i => {
          arr.push(i.data());
        });
        setSurveyData(arr);
        setSection(arr[currentSectionIndex].screens[currentScreenIndex]);
        setLoading(!loading);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <ActivityIndicator />;

  // const handleNext = () => {
  //   const currentSection = onBoardingData[currentSectionIndex];
  //   const nextScreenIndex = currentScreenIndex + 1;
  //   if (nextScreenIndex < currentSection.screens.length) {
  //     setCurrentScreenIndex(nextScreenIndex);
  //     setSection(currentSection.screens[nextScreenIndex]);
  //   } else {
  //     const nextSectionIndex = currentSectionIndex + 1;
  //     if (nextSectionIndex < onBoardingData.length) {
  //       setCurrentSectionIndex(nextSectionIndex);
  //       setCurrentScreenIndex(0);
  //     } else {
  //       console.log('Onboarding complete');
  //     }
  //   }
  // };
  const handleNext = () => {
    const currentSection = surveyData[currentSectionIndex];
    const nextScreenIndex = currentScreenIndex + 1;
    if (nextScreenIndex < currentSection.screens.length) {
      setCurrentScreenIndex(nextScreenIndex);
      setSection(currentSection.screens[nextScreenIndex]);
    } else {
      const nextSectionIndex = currentSectionIndex + 1;
      if (nextSectionIndex < surveyData.length) {
        setCurrentSectionIndex(nextSectionIndex);
        setCurrentScreenIndex(0);
      } else {
        console.log('Onboarding complete');
      }
    }
        setProgress((currentScreenIndex / surveyData.length)*10);

  };
console.log(progress)
  // useMemo(()=>{
  //   setProgress(currentScreenIndex / surveyData.length);

  // },[currentScreenIndex])

  switch (section.type) {
    case 'button':
      return (
        <>
          <OnBoardingProgressBar
            totalValue={surveyData.length}
            progress={progress}
          />
          <ButtonGroupScreen section={section} handleNext={handleNext} />
        </>
      );
    case 'radio':
      return (
        <>
          <OnBoardingProgressBar
            totalValue={surveyData.length}
            progress={progress}
          />
          <ButtonGroupScreen section={section} handleNext={handleNext} />
        </>
      );
    case 'yesno':
      return (
        <>
          <OnBoardingProgressBar
            totalValue={surveyData.length}
            progress={progress}
          />
          <YesNoScreen section={section} handleNext={handleNext} />
        </>
      );
    case 'quiz':
      return <QuizScreen section={section} handleNext={handleNext} />;
    case 'checkbox':
      return (
        <>
          <OnBoardingProgressBar
            totalValue={surveyData.length}
            progress={progress}
          />
          <ButtonGroupScreen section={section} handleNext={handleNext} />
        </>
      );
    default:
      return (
        <>
          <OnBoardingProgressBar
            totalValue={surveyData.length}
            progress={progress}
          />
          <SingleChoiceScreen section={section} handleNext={handleNext} />
        </>
      );
  }
};
export default OnboardingScreen;
