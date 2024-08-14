import {View, Text, FlatList, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import {useScreenContext} from '../../../context/screenContext';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import textStyle from '../../../style/text/style';
import CustomButton from '../../../components/button/customButton';
import { colorPalette } from '../../../assets/colorpalette/colorPalette';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const Coursecarousel = ({route}:any) => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait, isTabletType, scale} =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation = useNavigation();
  const ref = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonLabel, setButtonLabel] = useState("Read");
  
  const data = route.params.data; 

  const handleScroll = () => {
    let nextIndex = currentIndex + 1;

    if (nextIndex < data.length) {
      setCurrentIndex(nextIndex);
      ref.current?.scrollToIndex({index: nextIndex});
    }

    if (nextIndex === data.length - 1) {
      setButtonLabel("Save and Go Back");
    } else if (nextIndex === data.length) {
      navigation.goBack();
    }
  };
  return (
    <View style={screenStyles.container}>
      <FlatList
        ref={ref}
        data={data}
        renderItem={({item, index}) => (
          <View style={screenStyles.eachItem}>
            <Image
              source={{
                uri: item.images[0],
              }}
              style={screenStyles.image}
            />
            <Text style={textStyle.headingText}>{item.title}</Text>
            <Text
              numberOfLines={10}
              style={[
                textStyle.labelText,
                {
                  lineHeight: 30,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                },
              ]}>
              {item.todo}
            </Text>
            <Text style={textStyle.headingText}>{index}</Text>
          </View>
        )}
        scrollEnabled={false}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
      <CustomButton
        label={buttonLabel}
        btnWidth={width * 0.8}
        btnHeight={50}
        btnColor={colorPalette.berry}
        onPress={handleScroll}
        labelColor='white'
      />
    </View>
  );
};

export default Coursecarousel;