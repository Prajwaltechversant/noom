import { View, Text, FlatList, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { log } from 'echarts/types/src/util/log.js';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useScreenContext } from '../../../context/screenContext';
import { useNavigation } from '@react-navigation/native';
import textStyle from '../../../style/text/style';
import CustomButton from '../../../components/button/customButton';
import { colorPalette } from '../../../assets/colorpalette/colorPalette';
import { screenNames } from '../../../preferences/staticVariable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageSkeltonComponent from '../../../components/skeltons/imageSkelton';
import styles from './style';

const Coursecarousel = ({ route }: any) => {
  const screenContext = useScreenContext();
  const { width, height, isPortrait } = screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation: any = useNavigation();
  const ref = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonLabel, setButtonLabel] = useState('Continue');
  const currentUid = auth().currentUser?.uid;
  const data = route.params.data;
  const id = route.params.id;
  const isCompleted = route.params.isCompleted;
  const [color, setColor] = useState(colorPalette.black);
  const [addedToArticle, setAddedToArticle] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true)
  const artiCle = route.params


  const handleScroll = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex < data.length) {
      setCurrentIndex(nextIndex);
      ref.current?.scrollToIndex({ index: nextIndex });
    } else {
      if (!isCompleted) {
        firestore()
          .collection(`UserData/${currentUid}/dailyCourse`)
          .doc(id)
          .update({ isCompleted: true })
          .then(() => navigation.navigate(screenNames.HomeScreen))
          .catch(error => Alert.alert((error as Error).message)
          );
      } else {
        navigation.navigate(screenNames.HomeScreen);
      }
    }
    if (nextIndex === data.length - 1) {
      setButtonLabel('Save and Go Back');
    }
  };

  const saveToArticle = async () => {
    try {
      if (!addedToArticle) {
        await firestore().collection(`UserData/${currentUid}/savedArticles`).add({ ...artiCle });
        setAddedToArticle(true);
        setColor(colorPalette.moss);
      }
    } catch (error) {
      Alert.alert((error as Error).message)
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={saveToArticle}>
          <MaterialCommunityIcons name='bookmark' color={color} size={30} />
        </TouchableOpacity>
      ),
    });
  }, [color, navigation]);

  useEffect(() => {
    const subscriber = firestore()
      .collection(`UserData/${currentUid}/savedArticles`)
      .where('id', '==', id)
      .onSnapshot(documentSnapshot => {
        const res = documentSnapshot.docs.map(i => i.data());
        if (res.length > 0) {
          setAddedToArticle(true);
          setColor(colorPalette.moss);
        }
      }, error => Alert.alert((error as Error).message)
      );

    return () => subscriber();
  }, [currentUid, id]);
  return (
    <>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={Array(1)}
        renderItem={({ i }: any) => <View style={screenStyles.container}>
          <FlatList
            ref={ref}
            data={data}
            renderItem={({ item }) => (
              <View style={screenStyles.eachItem}>
                <View>
                  <Image
                    source={{ uri: item.images[0] }}
                    style={screenStyles.image}
                    onLoad={() => setIsImageLoading(false)}
                  />
                  {
                    isImageLoading && <ImageSkeltonComponent width={width} height={height * 0.3} />
                  }
                </View>
                <Text style={textStyle.headingText}>{item.title}</Text>
                <Text
                  style={[textStyle.labelText, screenStyles.paragraph]}
                >
                  {item.todo}
                </Text>
              </View>
            )}
            scrollEnabled={false}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>}
      />
      <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center' }}>
        <CustomButton
          label={buttonLabel}
          btnWidth={width * 0.4}
          btnHeight={50}
          btnColor={colorPalette.berry}
          onPress={handleScroll}
          labelColor="white"
          borderRadius={10}
        />
      </View>
    </>
  );
};

export default Coursecarousel;
