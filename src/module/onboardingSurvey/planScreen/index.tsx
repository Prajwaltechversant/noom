import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useScreenContext } from '../../../context/screenContext';
import styles from './style';
import firestore from '@react-native-firebase/firestore';
import textStyle from '../../../style/text/style';
import { Card, Text } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../../components/button/customButton';
import { colorPalette } from '../../../assets/colorpalette/colorPalette';
import { useNavigation } from '@react-navigation/native';
import { screenNames, staticVariables } from '../../../preferences/staticVariable';
import { useDispatch } from 'react-redux';
import { addPlanData } from '../../../redux/slices/planSlice';
import auth from '@react-native-firebase/auth';
import ImageSkeltonComponent from '../../../components/skeltons/imageSkelton';

const PlanScreen = () => {
  const screenContext = useScreenContext();
  const { width, height, isPortrait } = screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );

  const [plans, setPlans] = useState<any[]>(staticVariables.EMPTY_ARRAY);
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0);
  const navigation: any = useNavigation();
  const [planId, setPlanId] = useState<string | undefined>();
  const [isImageLoading, setIsImageLoading] = useState(true)
  const currentUId = auth().currentUser?.uid;

  const dispatch = useDispatch();

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const snapshot = await firestore().collection('plans').get();
        const planArray = snapshot.docs.map(doc => doc.data());
        setPlans(planArray);
        if (planArray.length > 0) {
          setCurrentPlanIndex(0);
          setPlanId(planArray[0].id);
        }
      } catch (error) {
      }
    };
    loadPlans();
  }, []);


  const handleNext = (itemid: number) => {
    const nextScreenIndex = currentPlanIndex + 1;
    if (nextScreenIndex < plans.length) {
      setCurrentPlanIndex(nextScreenIndex);
      setPlanId(plans[nextScreenIndex]?.id);
    } else {
      navigation.navigate(screenNames.Payment_Screen1);
    }
    if (planId) {
      dispatch(addPlanData({ planId: planId, itemId: itemid }));
    }
  };

  const handleSkip = () => {
    const nextScreenIndex = currentPlanIndex + 1;
    if (nextScreenIndex < plans.length) {
      setCurrentPlanIndex(nextScreenIndex);
    } else {
      navigation.navigate(screenNames.Payment_Screen1);
    }

  }

  const currentPlan = plans[currentPlanIndex];
  if (!currentPlan) return null;

  return (
    <View style={screenStyles.container}>
      <FlatList
        ListHeaderComponent={<Text style={textStyle.headingText}>Add these Plans</Text>}
        showsVerticalScrollIndicator={false}
        data={currentPlan.plans}
        renderItem={({ item }) => (
          <Card style={screenStyles.cardContainer}>
            <Card.Title
              title={item.title || 'Plan Title'}
              titleStyle={{ textAlign: 'center', color: 'black', textTransform: 'capitalize', fontWeight: '700' }}
              titleNumberOfLines={2}
              style={screenStyles.cardTitle}
              titleVariant='headlineLarge'
            />
            <Card.Content style={screenStyles.cardBody}>
              <View style={screenStyles.imageContainer}>
                <Image
                  source={{ uri: item.image ? item.image : 'https://th.bing.com/th/id/OIP.UTrS1TkhQrRJtvhu-0RC-gHaHa?rs=1&pid=ImgDetMain' }}
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                  onLoad={() => setIsImageLoading(false)}
                />

                {
                  isImageLoading && <View style={{ position: 'absolute' }}>
                    <ImageSkeltonComponent width={isPortrait ? width * 0.1 : height * 0.1} height={isPortrait ? width * 0.1 : height * 0.1} /></View>
                }
              </View>
              <Text variant="titleLarge" style={[screenStyles.title, { textTransform: 'capitalize', fontWeight: '600' }]}>
                {item.title || 'Card title'}
              </Text>
              <View style={screenStyles.descriptionContainer}>
                <FlatList
                  data={item.description}
                  renderItem={({ item }) => (
                    <View style={screenStyles.pointsContainer}>
                      <View style={screenStyles.tickIcon}>
                        <MaterialIcons name="done" color={'white'} />
                      </View>
                      <Text style={
                        textStyle.labelText
                        // { textAlign: 'justify',color:'#00202e',fontSize:20 }
                      }>
                        {item.slice(0, 60)}
                      </Text>
                    </View>
                  )}
                />
              </View>
            </Card.Content>
            <Card.Actions>
              <View style={screenStyles.actionContainer}>
                <CustomButton
                  label="Add it to my plan"
                  btnWidth={isPortrait ? width * 0.4 : width * 0.2}
                  btnHeight={isPortrait ? width * 0.1 : height * 0.12}
                  btnColor={'#2c4875'}
                  borderRadius={isPortrait ? width* 0.04 : height* 0.04}
                  labelColor="white"
                  onPress={() => handleNext(item.id)}
                />
              </View>
            </Card.Actions>
          </Card>
        )}
        ListFooterComponent={
          <TouchableOpacity
            style={screenStyles.skipButton}
            onPress={handleSkip}>
            <Text
              style={[
                textStyle.labelText,
                {
                  textDecorationStyle: 'dotted',
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  textDecorationLine: 'underline'
                },
              ]}>
              No, I don't need this plan
            </Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

export default PlanScreen;
