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
import { screenNames } from '../../../preferences/staticVariable';
import { useDispatch } from 'react-redux';
import { addPlanData } from '../../../redux/slices/planSlice';

const PlanScreen = () => {
  const screenContext = useScreenContext();
  const { width, height, isPortrait } = screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );

  const [plans, setPlans] = useState<any[]>([]);
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0);
  const navigation:any = useNavigation();
  const [planId, setPlanId] = useState<string | undefined>();

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
        console.error("Error fetching plans: ", error);
      }
    };
    loadPlans();
  }, []);

  const handleNext = () => {
    const nextScreenIndex = currentPlanIndex + 1;
    if (nextScreenIndex < plans.length) {
      setCurrentPlanIndex(nextScreenIndex);
      setPlanId(plans[nextScreenIndex]?.id); 
    } else {
      navigation.navigate(screenNames.Payment_Screen1);
    }
    if (planId) {
      dispatch(addPlanData({ planId: planId, itemId: planId }));
    }
  };

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
              titleStyle={{ textAlign: 'center' }}
              titleNumberOfLines={2}
              style={screenStyles.cardTitle}
            />
            <Card.Content style={screenStyles.cardBody}>
              <View style={screenStyles.imageContainer}>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                />
              </View>
              <Text variant="titleLarge" style={screenStyles.title}>
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
                      <Text style={{ textAlign: 'justify' }}>
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
                  btnWidth={width * 0.4}
                  btnHeight={width * 0.1}
                  btnColor={colorPalette.berry}
                  borderRadius={20}
                  labelColor="white"
                  onPress={handleNext}
                />
              </View>
            </Card.Actions>
          </Card>
        )}
        ListFooterComponent={
          <TouchableOpacity
            style={screenStyles.skipButton}
            onPress={handleNext}>
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
