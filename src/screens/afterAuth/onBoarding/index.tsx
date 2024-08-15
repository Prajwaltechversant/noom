import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import OnBoardingProgressBar from '../../../components/onBoarding/progressBar';
import ButtonGroupScreen from '../../../module/onboardingSurvey/multiChoiceScreen';
import YesNoScreen from '../../../module/onboardingSurvey/yesnoScreen';
import SingleChoiceScreen from '../../../module/onboardingSurvey/singleChoiceScreen';
import QuizScreen from '../../../module/onboardingSurvey/quizScreen';
import styles from './style';
import { updateSurveyProgress } from '../../../redux/slices/surveyProgressSlice/surveySlice';
import { screenNames } from '../../../preferences/staticVariable';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { useScreenContext } from '../../../context/screenContext';
import { addSurveyData } from '../../../redux/slices/questionsSlice';
import CustomComponentModal from '../../../components/modal/customComponentModal';
import InfoScreen1 from '../../../module/onboardingSurvey/infoScreens/infoScreen1';
import EChartComponent from '../../../module/echart/echart1';

const OnboardingScreen = () => {
  const screenContext = useScreenContext();
  const { width, height, isPortrait } = screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation: any = useNavigation();
  const surveyProgress = useAppSelector(state => state.surveyProgressSlice);
  const surveyQuestion = useAppSelector(state => state.questions);

  const [currentSectionIndex, setCurrentSectionIndex] = useState(
    surveyProgress.currentSection,
  );
  const [currentScreenIndex, setCurrentScreenIndex] = useState(
    surveyProgress.currentScreen,
  );
  const [surveyData, setSurveyData] = useState<any[]>(surveyQuestion);
  const [section, setSection] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(surveyProgress.progress);
  const [screenIndex, setScreenIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const [visibleModal, setVisibleModal] = React.useState(false);

  const dispatch = useAppDispatch();

  const getData = async () => {
    if (surveyData.length === 0) {
      firestore()
        .collection('survey')
        .get()
        .then((item): any => {
          let arr: any = [];
          item.forEach(i => {
            arr.push(i.data());
          });
          setSurveyData(arr);
          setSection(arr[currentSectionIndex]?.screens?.[currentScreenIndex]);
          setLoading(false);
          dispatch(addSurveyData(arr));
        });
    } else {
      setLoading(false);
    }
  };
  console.log(currentSectionIndex, currentScreenIndex);
  useEffect(() => {
    if (surveyData.length <= 0) {
      getData();
    } else {
      setSection(surveyData[currentSectionIndex].screens[0]);
      setLoading(false);
    }
  }, []);
  console.log(section);
  useMemo(() => {
    let totalLength = 0;
    surveyData.forEach((item: any) => {
      totalLength += item.screens.length;
    });
    setTotal(totalLength);
  }, [surveyData]);

  useEffect(() => {
    if (currentSectionIndex === 1 && currentScreenIndex === 1) {
      navigation.navigate(screenNames.infoScreen1, {
        image:
          'https://firebasestorage.googleapis.com/v0/b/noom-29f53.appspot.com/o/onBoarding%20Images%2F1719851300137-removebg-preview.png?alt=media&token=6ec2e6c2-17ca-4fb1-92a4-ab9fc8d26223',
        page: 'intro1',
      });
    } else if (currentSectionIndex === 2 && currentScreenIndex === 1) {
      navigation.navigate(screenNames.Echart_Screen1);
    } else if (currentSectionIndex === 3 && currentScreenIndex === 1) {
      navigation.navigate(screenNames.infoScreen1, {
        image:
          'https://firebasestorage.googleapis.com/v0/b/noom-29f53.appspot.com/o/onBoarding%20Images%2F1719851300137-removebg-preview.png?alt=media&token=6ec2e6c2-17ca-4fb1-92a4-ab9fc8d26223',
        page: 'intro2',
      });
    } else null;
  }, [progress]);
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
        setSection(surveyData[nextSectionIndex].screens[0]);
      } else {
        navigation.navigate(screenNames.Plan_Screen);
      }
    }

    const updatedScreenIndex = screenIndex + 1;
    const currentProgress = (updatedScreenIndex / total) * 100;
    setScreenIndex(updatedScreenIndex);
    setProgress(currentProgress);

    dispatch(
      updateSurveyProgress({
        currentScreen:
          nextScreenIndex < currentSection.screens.length ? nextScreenIndex : 0,
        currentSection:
          currentSectionIndex < surveyData.length
            ? currentSectionIndex
            : currentSectionIndex,
        progress: currentProgress,
      }),
    );
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
        const lastScreenIndex = prevSection.screens.length - 1;
        setCurrentScreenIndex(lastScreenIndex);
        setSection(prevSection.screens[lastScreenIndex]);
      } else {
        console.log('Already at the first screen');
      }
    }

    const updatedScreenIndex = screenIndex > 0 ? screenIndex - 1 : 0;
    const currentProgress = (updatedScreenIndex / total) * 100;
    setScreenIndex(updatedScreenIndex);
    setProgress(currentProgress);

    dispatch(
      updateSurveyProgress({
        currentScreen: prevScreenIndex >= 0 ? prevScreenIndex : 0,
        currentSection:
          currentSectionIndex - 1 >= 0
            ? currentSectionIndex - 1
            : currentSectionIndex,
        progress: currentProgress,
      }),
    );
  };

  switch (section?.type) {
    case 'button':
    case 'radio':
    case 'checkbox':
      return (
        <>
          <OnBoardingProgressBar
            totalValue={surveyData.length}
            progress={progress}
            handlePrev={handlePrev}
            duration={500}
            sectionTitle={surveyData[currentSectionIndex]?.section}
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
            sectionTitle={surveyData[currentSectionIndex]?.section}
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
            sectionTitle={surveyData[currentSectionIndex]?.section}
          />
          <QuizScreen section={section} handleNext={handleNext} />
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
            sectionTitle={surveyData[currentSectionIndex]?.section}
          />
          <SingleChoiceScreen section={section} handleNext={handleNext} />
        </>
      );
  }
};

export default React.memo(OnboardingScreen);
