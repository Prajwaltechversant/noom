import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../../context/screenContext';
import textStyle from '../../../style/text/style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {CourseType} from '../../../types/types';
import CustomComponentModal from '../../modal/customComponentModal';
import TrackPlayer from 'react-native-track-player';
import {setupPlayer} from '../../../../musicPlayerService';
import PlayerModal from '../playerModal';

interface Props {
  item: CourseType;
  setmodalVisible:(a:boolean)=>void
}

const CourseItem: React.FC<Props> = ({item}) => {
  const screenContext = useScreenContext();
  const {width, fontScale, height, isPortrait, isTabletType, scale} =
    screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );
  const navigation: any = useNavigation();
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  

  const setupPlayerReady = async () => {
    let isSetup = await setupPlayer();
    if (isSetup) {
      await TrackPlayer.add({
        id: 'trackId',
        url: `${item.audio}`,
        title: 'Track Title',
        artist: 'Track Artist',
        artwork: '<https://example.com/track.jpg>',
      });
    }
    setIsPlayerReady(isSetup);
  };

  useEffect(() => {
    setupPlayerReady();
  }, []);

  const playAudio = async () => {
    try {
      await TrackPlayer.play();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.col1}>
        <Text
          style={[
            textStyle.questionText,
            {textAlign: 'left', textTransform: 'capitalize'},
          ]}>
          {item?.title}
        </Text>
        <Text style={screenStyles.text}>3 min</Text>
        <View style={screenStyles.actionContainer}>
          <TouchableOpacity
            style={screenStyles.actionBox}
            onPress={() =>
              navigation.navigate('courseCarouselPage', {
                ...item,
                id: item.id,
                isCompleted: item.isCompleted,
              })
            }>
            <FontAwesome name="book" size={20} color={'black'} />
            <Text style={screenStyles.text}>Read</Text>
          </TouchableOpacity>
          <TouchableOpacity style={screenStyles.actionBox} onPress={()=>}>
            <Feather name="speaker" size={20} color={'black'} />
            <Text style={screenStyles.text}>Listen</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={screenStyles.col2}>
        {item.isCompleted ? (
          <Image
            source={{
              uri: 'https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/success-green-check-mark-icon.png',
            }}
            style={screenStyles.thumbnail}
          />
        ) : (
          <Image
            source={{uri: item?.thumbnail}}
            style={screenStyles.thumbnail}
          />
        )}
      </View>
      <PlayerModal modalVisble />

    </View>
  );
};

export default CourseItem;
