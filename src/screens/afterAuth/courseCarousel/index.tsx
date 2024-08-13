import {View, Text, FlatList} from 'react-native';
import React, {useRef, useState} from 'react';
import {useScreenContext} from '../../../context/screenContext';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import textStyle from '../../../style/text/style';
import CustomButton from '../../../components/button/customButton';
import {Image} from 'react-native';

const Coursecarousel = ({route}) => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait, isTabletType, scale} =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation: any = useNavigation();
  const ref = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const data = Array(5);
  const handleScroll = () => {
    let nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    if (nextIndex <= data.length - 1) {
      ref.current?.scrollToIndex({index: currentIndex + 1});
    }
    if (nextIndex === data.length) {
      navigation.goback();
    }
  };

  return (
    <View style={screenStyles.container}>
      <FlatList
        ref={ref}
        data={route.params.data}
        renderItem={({item, index}) => (
          <View style={screenStyles.eachItem}>
            <Image
              source={{
                uri: item.image,
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
      />
      <CustomButton
        label="Read"
        btnWidth={width * 0.8}
        btnHeight={50}
        btnColor="red"
        onPress={handleScroll}
      />
    </View>
  );
};

export default Coursecarousel;
