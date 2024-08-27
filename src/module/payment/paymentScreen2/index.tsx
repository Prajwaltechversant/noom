import { View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useScreenContext } from '../../../context/screenContext';
import styles from './style';
import EChartFinal from '../../echart/echartfinal';
import textStyle from '../../../style/text/style';
import { colorPalette } from '../../../assets/colorpalette/colorPalette';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { Divider, Text } from 'react-native-paper';
import CustomButton from '../../../components/button/customButton';
import { Image } from 'react-native';
import CustomTextInputComponent from '../../../components/textInput';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { updateOnBoardingStatus } from '../../../redux/slices/authStatus';
// import PlanItem from '../../../components/onBoarding/planItem';
import { useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather'
import { removePlan } from '../../../redux/slices/planSlice';


type CardDetails = 'number' | 'cvv' | 'exp'

const PaymementScreen2: React.FC = ({ route }: any) => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait, isTabletType, scale } =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );

  const [showChartView, setShowChartView] = useState(true);
  const [showPaymentInfo, setShowPaymentInfo] = useState(true);
  const [showCardOption, setShowCardOptions] = useState(false);
  const survey = useAppSelector(state => state.onBoarding);
  const currentUId = auth().currentUser?.uid;
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const currentUser = auth().currentUser?.email;
  const displayName = auth().currentUser?.displayName;
  const addOnPlans = useAppSelector(state => state.planDetails)
  console.log(addOnPlans)
  const [planDetails, setPlanDetails] = useState<any>([])
  const [cardDetails, setCardDetails] = useState({
    number: '', cvv: '', exp: ''
  })

  useEffect(() => {
    const loadItems = async () => {
      try {
        const snapshot = await firestore().collection('plans').get();
        const planArray = snapshot.docs.map(doc => doc.data());

        const filteredItems = planArray.flatMap(plan =>
          plan.plans.filter((planItem: any) =>
            addOnPlans.some((addOn: any) =>
              plan.id === addOn.planId && planItem.id === addOn.itemId
            )
          )
        );

        setPlanDetails(filteredItems);
      } catch (error) {
        console.error("Error ", error);
      }
    };

    loadItems();
  }, [addOnPlans]);


  const updateAuthStatus = async () => {
    try {
      await firestore().collection(`UserData/${currentUId}/profileCompletionStatus`).doc(currentUId).set({
        isOnBoardingCompleted: true,
        isProfileCompleted: false
      })

    } catch (error) {
      console.error("Error ", error);

    }
  }

  const handlepayment = () => {
    try {
      firestore()
        .collection(`UserData/${currentUId}/survey`)
        .add({
          ...survey,
        })
        .then(() => {
          AsyncStorage.setItem('surveyStatus', 'true');
          dispatch(updateOnBoardingStatus(true));
          updateAuthStatus()
          navigation.replace('profile');
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id: any) => {

    let newState = [...planDetails]
    setPlanDetails(newState.filter(item => item.id !== id))
    dispatch(removePlan(id))
  }


  const handleChange = (text: any) => {
    const cleanedText = text.replace(/\D/g, '');
    let formattedText = '';
    if (cleanedText.length > 2) {
      formattedText = `${cleanedText.slice(0, 2)}/${cleanedText.slice(2, 4)}`;
    } else {
      formattedText = cleanedText;
    }
    setCardDetails({ ...cardDetails, exp: formattedText })
  };
  return (
    <ScrollView style={screenStyles.container}>
      <View style={{ alignItems: 'center' }}>
        <View style={screenStyles.headerContainer}>
          <Text
            style={[
              { lineHeight: 40, fontSize: 30, fontWeight: '700', color: 'white' },
            ]}>
            {displayName !== null ? displayName : currentUser?.slice(0, 6)}'s {`\n`}
            10-Months
            {`\n`}
            Personalized Plan
          </Text>
        </View>
        <View style={screenStyles.content}>
          <View>
            <TouchableOpacity
              style={screenStyles.collapseViewBtn}
              onPress={() => setShowChartView(!showChartView)}>
              <Text style={textStyle.questionText}>View Personalized Plan</Text>
              <Divider style={{ borderColor: colorPalette.sand }} />

            </TouchableOpacity>
            {showChartView && (
              <>
                <View style={screenStyles.personilzedBox}>
                  <Text
                    numberOfLines={4}
                    lineBreakMode="clip"
                    style={{ lineHeight: 30, textAlign: 'center' }}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Error commodi consequuntur enim aspernatur provident
                    blanditiis aut? Dolorum porro, fugit, neque minus placeat
                    consectetur dolorem totam, unde dolore distinctio ipsa quo!
                  </Text>
                </View>

                <EChartFinal />

                <View>
                  <View style={screenStyles.priceInfo}>
                    <FontAwesome6
                      name="circle"
                      color={colorPalette.gold}
                      size={20}
                    />
                    <Text>7-day trail with Full access</Text>
                    <Text>{`\u0024`} {route.params.selctedPlan}
                    </Text>
                    <Divider />
                  </View>
                </View>

              </>
            )}

            {
              planDetails.map((item: any) => (
                <>
                  <View style={screenStyles.planBox}>
                    <View>
                      <Text style={[textStyle.labelText, { textTransform: 'capitalize' }]}>{item.title}</Text>
                      <Text style={{ textDecorationColor: 'blue', textDecorationStyle: 'double', textDecorationLine: "underline", color: 'blue', marginTop: 4 }}>Learn More</Text>
                    </View>
                    <View>
                      <Text style={{ textAlign: 'right', color: 'black' }}>${item.amount}</Text>
                      <TouchableOpacity onPress={() => handleDelete(item.id)}>
                        <Feather style={{ textAlign: 'right' }} name='x' size={30} color={colorPalette.black} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Divider />
                </>
              ))
            }

            <TouchableOpacity
              style={screenStyles.collapseViewBtn}
              onPress={() => setShowPaymentInfo(!showPaymentInfo)}>
              <Text style={textStyle.questionText}>Add Payment Info</Text>
              <Divider />
            </TouchableOpacity>
            {showPaymentInfo && (
              <>
                <Text style={[textStyle.labelText, { textAlign: 'center' }]} numberOfLines={2}>
                  You will be charged only {`\n`}
                  <Text style={{ textTransform: 'capitalize', letterSpacing: 1, color: colorPalette.berry, fontSize: 20, fontWeight: '800' }}>
                    {`\u0024`} {route.params.selctedPlan}
                  </Text>
                  today for your trail
                </Text>
                <Divider />
                <Text style={[textStyle.labelText, { textAlign: 'center' }]}>
                  Select Paymement Method
                </Text>

                <TouchableOpacity style={screenStyles.paymentBtn}>
                  <FontAwesome6
                    name="circle"
                    color={colorPalette.gold}
                    size={20}
                  />
                  <Image
                    source={{
                      uri: 'https://static.vecteezy.com/system/resources/previews/022/100/701/non_2x/paypal-logo-transparent-free-png.png',
                    }}
                    style={screenStyles.logo}
                  />
                </TouchableOpacity>
                <Divider />

                <TouchableOpacity
                  style={screenStyles.paymentBtn}
                  onPress={() => setShowCardOptions(!showCardOption)}>
                  <FontAwesome6
                    name="circle"
                    color={colorPalette.gold}
                    size={20}
                  />
                  <Image
                    source={{
                      uri: 'https://static.vecteezy.com/system/resources/previews/022/100/701/non_2x/paypal-logo-transparent-free-png.png',
                    }}
                    style={screenStyles.logo}
                  />
                  <Image
                    source={{
                      uri: 'https://logos-world.net/wp-content/uploads/2020/04/Visa-Symbol.png',
                    }}
                    style={[screenStyles.logo, { height: 20 }]}
                  />
                  <Image
                    source={{
                      uri: 'https://logos-world.net/wp-content/uploads/2020/09/Mastercard-Logo-2016-2020.png',
                    }}
                    style={screenStyles.logo}
                  />
                </TouchableOpacity>
                <Divider />
                {showCardOption && (
                  <View style={screenStyles.cardOption}>
                    <CustomTextInputComponent
                      textColor='black'
                      label={'Card Number'}
                      mode="outlined"
                      outlineColor="transparent"
                      inputMode="numeric"
                      onChangeText={e => setCardDetails({ ...cardDetails, number: e })}
                    />

                    <CustomTextInputComponent
                      textColor='black'
                      label={'Cvv'}
                      mode="outlined"
                      outlineColor="transparent"
                      inputMode="numeric"

                      maxLength={3}
                      onChangeText={e => setCardDetails({ ...cardDetails, cvv: e })}

                    />
                    <CustomTextInputComponent
                      textColor='black'
                      label={'exp'}
                      mode="outlined"
                      outlineColor="transparent"
                      inputMode="numeric"
                      maxLength={5}
                      placeholder='MM/YY'
                      onChangeText={handleChange}
                      value={cardDetails.exp}

                    />
                  </View>
                )}

                <View style={{ alignItems: 'center' }}>
                  <CustomButton
                    btnWidth={width * 0.8}
                    btnHeight={isPortrait ? width * 0.2 : width * 0.08}
                    label={'Pay Now '}
                    btnColor={colorPalette.berry}
                    borderRadius={10}
                    onPress={handlepayment}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PaymementScreen2;
