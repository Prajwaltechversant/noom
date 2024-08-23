import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useScreenContext } from '../../../context/screenContext';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import textStyle from '../../../style/text/style';
import CustomButton from '../../../components/button/customButton';
import { colorPalette } from '../../../assets/colorpalette/colorPalette';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { screenNames } from '../../../preferences/staticVariable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'




const Coursecarousel = ({ route }: any) => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait, isTabletType, scale } =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation: any = useNavigation();
  const ref = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonLabel, setButtonLabel] = useState('Read');
  const currentUid = auth().currentUser?.uid;
  const data = route.params.data;
  const id = route.params.id;
  const isCompleted = route.params.isCompleted;
  const [color, setColor] = useState(colorPalette.black)
  const [addedToArticle, setAddedtoArticle] = useState(false)
  const handleScroll = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex < data.length) {
      setCurrentIndex(nextIndex);
      ref.current?.scrollToIndex({ index: nextIndex });
    }
    if (nextIndex === data.length - 1) {
      setButtonLabel('Save and Go Back');
    } else if (nextIndex === data.length) {
      try {
        if (!isCompleted) {
          firestore()
            .collection(`UserData/${currentUid}/dailyCourse`)
            .doc(id)
            .update({
              isCompleted: true,
            })
            .then(() => {
              navigation.navigate(screenNames.HomeScreen);
            });
        } else {
          navigation.navigate(screenNames.HomeScreen);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const saveToArticle = async () => {
    try {
      if (!addedToArticle) {
        await firestore().collection(`UserData/${currentUid}/savedArticles`).add(
          { data: [...data], id: id }
        )
        setAddedtoArticle(true)
        setColor(colorPalette.moss)
        setAddedtoArticle(true)
      }

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity onPress={saveToArticle}>
            <MaterialCommunityIcons name='bookmark' color={color} size={30} />
          </TouchableOpacity>
        );
      },
    });
  }, []);

  useEffect(() => {

    const subscriber = firestore()
      .collection(`UserData/${currentUid}/savedArticles`)
      .where('id', '==', id)
      .onSnapshot(documentSnapshot => {
        const res = documentSnapshot.docs.map(i => i.data())
        if (res.length === 1) {
          console.log('====================================');
          console.log(res.length);
          console.log('====================================');
          setAddedtoArticle(true)
          setColor('red')
        }
      });
console.log('====================================');
console.log(color,'uyf');
console.log('====================================');
    return () => subscriber();
  }, []);

  console.log('====================================');  
  console.log(color);
  console.log('====================================');
  return (
    <View style={screenStyles.container}>
      <FlatList
        ref={ref}
        data={data}
        renderItem={({ item, index }) => (
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
                screenStyles.paragraph
              ]}>
              {item.todo}
            </Text>
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
        labelColor="white"
      />
    </View>
  );
};

export default Coursecarousel;
