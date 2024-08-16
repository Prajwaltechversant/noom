import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useScreenContext } from '../../../context/screenContext';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import textStyle from '../../../style/text/style';
import CustomButton from '../../../components/button/customButton';
import { colorPalette } from '../../../assets/colorpalette/colorPalette';
import { screenNames } from '../../../preferences/staticVariable';
import { useAppSelector } from '../../../redux/hook';

const PaymentScreen1 = () => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait, isTabletType, scale } =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation: any = useNavigation();


  const plans = [0.5, 3, 10, 18.37];
  const [plan, setPlan] = useState(0);


  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.headerContainer}>
        <Text style={textStyle.headingText}>Try noom For a week</Text>
        <Text style={[screenStyles.headerText]}>
          <Text style={{ fontStyle: "italic", fontWeight: '900' }}>
            Money shouldn't </Text>
          stand in the way of finding a plan that finally works.
        </Text>
        <Text style={screenStyles.headerText}>
          <Text style={{ fontStyle: "italic", fontWeight: '900' }}>
            It costs us approximately $10
          </Text>
          to offer a 7 day trail. Please pick an
          amount that's reasonable for you.
        </Text>
      </View>

      <View style={screenStyles.paymentContainer}>
        <Text style={textStyle.headingText}>
          Choose a price for your 7 day trial
        </Text>

        <FlatList
          horizontal
          data={plans}
          renderItem={({ item }) => (
            <View style={screenStyles.amountContainer}>
              <TouchableOpacity
                style={[screenStyles.amountBox,
                {
                  backgroundColor: plan === item ? colorPalette.salmon : colorPalette.berry,

                }
                ]}
                onPress={() => setPlan(item)}>
                <Text style={[screenStyles.amountText,
                {
                  color: plan === item ? colorPalette.berry : colorPalette.salmon,

                }
                ]}>{item}</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <Text style={textStyle.labelText}>
          This option will help nus support those who need to select the lowest
          trail prices
        </Text>

        <CustomButton
          label="Continoue"
          btnWidth={width * 0.8}
          btnHeight={height * 0.1}
          btnColor={colorPalette.berry}
          onPress={() => {
            if (plan > 0) {
              navigation.navigate(screenNames.Payment_Screen2, {
                selctedPlan: plan,
              });
            }
          }}
        />
      </View>
    </View>
  );
};

export default PaymentScreen1;
