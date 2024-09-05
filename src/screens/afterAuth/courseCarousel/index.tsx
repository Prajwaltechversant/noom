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
  const containerFlatListRef = useRef<FlatList>(null)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonLabel, setButtonLabel] = useState('Go Back');
  const currentUid = auth().currentUser?.uid;
  const data = route.params.data;
  const id = route.params.id;
  const isCompleted = route.params.isCompleted;
  const [color, setColor] = useState(colorPalette.black);
  const [addedToArticle, setAddedToArticle] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true)
  const artiCle = route.params


  const handleSubmit = () => {
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
        <>
          <TouchableOpacity onPress={saveToArticle}>
            <MaterialCommunityIcons name='bookmark' color={color} size={30} />
          </TouchableOpacity>

        </>

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
      <View style={screenStyles.container}>

        <View style={screenStyles.pageNoIcon}>
          <Text numberOfLines={1} style={{ color: 'white' }}>
            {
              currentIndex + 1 + ' '
            }
            / {data.length}
          </Text>
        </View>
        <FlatList
          ref={ref}
          data={data}
          renderItem={({ item, index }) => (
            <ScrollView>
              <View style={screenStyles.eachItem}>
                <View>
                  <Image
                    source={{ uri: item.images[0] }}
                    style={screenStyles.image}
                    onLoad={() => setIsImageLoading(false)}
                  />
                  {
                    isImageLoading && <View style={[screenStyles.image, { position: 'absolute' }]}
                    >
                      <ImageSkeltonComponent /></View>
                  }
                </View>
                <Text style={textStyle.headingText}>{item.title}</Text>
                <Text
                  style={[textStyle.labelText, screenStyles.paragraph]}
                >
                  {item.todo}
                </Text>
              </View>
            </ScrollView>
          )}
          scrollEnabled={true}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          onScroll={(e) => {
            const totalWidth = e.nativeEvent.layoutMeasurement.width
            const x = e.nativeEvent.contentOffset.x
            const index = Math.round(x / totalWidth)
            if (index !== currentIndex) {
              setCurrentIndex(index)
            }
            // containerFlatListRef.current?.scrollToIndex({ index: 0 })
          }}
          pagingEnabled={true}
        />
      </View>
      {
        currentIndex === data.length - 1 &&
        <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center' }}>
          <CustomButton
            label={isCompleted ? 'Go Back' : 'Save and GoBack'}
            btnWidth={width * 0.4}
            btnHeight={50}
            btnColor={colorPalette.berry}
            onPress={handleSubmit}
            labelColor="white"
            borderRadius={10}
          />
        </View>
      }
    </>
  );
};

export default Coursecarousel;
