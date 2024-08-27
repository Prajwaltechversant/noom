import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useScreenContext } from '../../../context/screenContext';
import styles from './style';
import { colorPalette } from '../../../assets/colorpalette/colorPalette';
import CustomButton from '../../../components/button/customButton';
import PaperButton from '../../../components/button/paperButton';
import textStyle from '../../../style/text/style';
import { useNavigation } from '@react-navigation/native';
import { screenNames } from '../../../preferences/staticVariable';

const EntryScreen = () => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait, isTabletType, scale } =
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
        <View style={screenStyles.headingContainer}>
          <FontAwesome6
            name="diamond"
            color={colorPalette.black}
            size={isPortrait ? width * 0.13 : width * 0.09}
          />
          <Text
            style={textStyle.headingText}
            numberOfLines={2}>{`Personalize your Noom Plan!`}</Text>
          <Text numberOfLines={2} style={textStyle.labelText}>
            Let's get to know you better so we can create the perfect plan for
            you!
          </Text>
        </View>
        <View style={screenStyles.buttonContainer}>
          <CustomButton
            btnColor={colorPalette.tarocco}
            btnHeight={isPortrait ? width * 0.12 : width * 0.08}
            btnWidth={isPortrait ? width * 0.8 : width * 0.4}
            label="Start"
            children={undefined}
            borderRadius={10}
            // style={{borderRadius:5}}
            labelColor="white"
            onPress={() => navigation.replace(screenNames.ONBAORDING)}
          />

          <TouchableOpacity>
            <Text style={[textStyle.labelText, { textAlign: 'center' }]}>
              Enter Your enique program Id
            </Text>
          </TouchableOpacity>
        </View>

        {/* <FlatList /> */}
      </View>
    </View>
  );
};

export default EntryScreen;
