import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
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
import {updateSurveyProgress} from '../../../redux/slices/surveySlice/surveySlice';
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
  
  const surveyProgress = useSelector(state => state.surveyProgressSlice);
  console.log(surveyProgress);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(surveyProgress.currentSection);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(surveyProgress.currentScreen);
  const [surveyData, setSurveyData] = useState<any>([]);
  const [section, setSection] = useState<any>();
  const [types, setTypes] = useState<string[]>();
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [progress, setProgress] = useState(surveyProgress.progress);
  const [screenIndex, setScreenIndex] = useState(0);
  // const progress = (currentSectionIndex / (totalSections - 1)) * 100;

  const getData = async () => {
    firestore()
      .collection('survey')
      .get()
      .then((item): any => {
        let arr: any = [];
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
  const dispatch = useDispatch();
  useMemo(() => {
    let totalLength = 0;
    surveyData.forEach((item: any) => {
      totalLength = totalLength + item.screens.length - 1;
    });
    setTotal(totalLength);
  }, [surveyData]);
  if (loading) return <ActivityIndicator />;

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
    setScreenIndex(screenIndex + 1);
    setProgress((screenIndex / total) * 100);
    dispatch(
      updateSurveyProgress({
        currentScreen: currentScreenIndex,
        currentSection: currentSectionIndex,
        progress: progress,
      }),
    );
    setScreenIndex(screenIndex);
    setProgress((screenIndex / total) * 100);
  };

  const handlePrev = () => {
    const currentSection = surveyData[currentSectionIndex];
    const prevScreenIndex = currentScreenIndex - 1;
    if (prevScreenIndex >= 0) {
      setCurrentScreenIndex(prevScreenIndex);
      setSection(currentSection.screens[prevScreenIndex]);
    } else {
      const prevSectionIndex = currentSectionIndex - 1;
      if (prevSectionIndex >= 0) {
        const prevSection = surveyData[prevSectionIndex];
        setCurrentSectionIndex(prevSectionIndex);
        setCurrentScreenIndex(prevSection.screens.length - 1);
        setSection(prevSection.screens[prevSection.screens.length - 1]);
      } else {
        console.log('1st screen');
      }
    }
  };

  switch (section.type) {
    case 'button':
      return (
        <>
          <OnBoardingProgressBar
            totalValue={surveyData.length}
            progress={progress}
            handlePrev={handlePrev}
            duration={500}
            sectionTitle={surveyData[currentSectionIndex].section}
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
            handlePrev={handlePrev}
            duration={500}
            sectionTitle={surveyData[currentSectionIndex].section}
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
            handlePrev={handlePrev}
            duration={500}
            sectionTitle={surveyData[currentSectionIndex].section}
          />
          <YesNoScreen section={section} handleNext={handleNext} />
        </>
      );
    case 'quiz':
      return (
        <>
          <OnBoardingProgressBar
            totalValue={surveyData.length}
            progress={progress}
            handlePrev={handlePrev}
            duration={500}
            sectionTitle={surveyData[currentSectionIndex].section}
          />
          <QuizScreen section={section} handleNext={handleNext} />
        </>
      );

    case 'checkbox':
      return (
        <>
          <OnBoardingProgressBar
            totalValue={surveyData.length}
            progress={progress}
            handlePrev={handlePrev}
            duration={500}
            sectionTitle={surveyData[currentSectionIndex].section}
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
            handlePrev={handlePrev}
            duration={500}
            sectionTitle={surveyData[currentSectionIndex].section}
          />
          <SingleChoiceScreen section={section} handleNext={handleNext} />
        </>
      );
  }
};
export default OnboardingScreen;
