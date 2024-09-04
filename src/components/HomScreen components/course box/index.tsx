import { View, Text, Image, TouchableOpacity, TouchableOpacityBase, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import TrackPlayer from 'react-native-track-player';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useScreenContext } from '../../../context/screenContext';
import textStyle from '../../../style/text/style';
import { CourseType } from '../../../types/types';
import PlayerModal from '../playerModal';
import { setupPlayer } from '../../../../musicPlayerService';
import styles from './style';

interface Props {
  item: CourseType;
  isArticle: boolean;
  handleDelete?: () => void;
}

const CourseItem: React.FC<Props> = ({ item, isArticle, handleDelete }) => {
  const screenContext = useScreenContext();
  const { width, fontScale, height, isPortrait } = screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width
  );
  const navigation: any = useNavigation();
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [trackDuration, setTrackDuration] = useState(0)




  const setupPlayerReady = async () => {
    try {
      const isSetup = await setupPlayer();
      if (isSetup) {
        await TrackPlayer.add({
          id: item.id,
          url: item?.audio,
          title: item.title,
          artist: 'Track Artist',
          artwork: '<https://example.com/track.jpg>',
        });
      }
      setIsPlayerReady(isSetup);
    } catch (error) {
      Alert.alert((error as Error).message)
    }
  };


  useEffect(() => {
    setupPlayerReady();
    return () => {
      TrackPlayer.reset();
    };
  }, []);

  const playAudio = async (audio: string) => {
    try {
      await TrackPlayer.add({
        id: item.id,
        url: audio,
        title: item.title,
        artist: 'Track Artist',
        artwork: '<https://example.com/track.jpg>',
      });
      await TrackPlayer.play();
    } catch (error) {
    }
  };

  const pauseAudio = async () => {
    try {
      await TrackPlayer.pause();
    } catch (error) {
      // Alert.alert((error as Error).message)
      // console.log(error)

    }
  };
  const replayTrack = async () => {
    try {
      await TrackPlayer.seekTo(0);
      await TrackPlayer.play();
    } catch (error) {
      // Alert.alert((error as Error).message)
      // console.log(error)
    }
  };

  const seekToPosition = async (pos: number) => {
    try {
      await TrackPlayer.seekTo(pos);

    } catch (error) {
      // Alert.alert((error as Error).message)
      // console.log(error)
    }
  }


  return (
    <>
      <View style={screenStyles.container}>
        <View style={screenStyles.col1}>
          <Text
            style={[
              textStyle.questionText,
              { textAlign: 'left', textTransform: 'capitalize' },
            ]}
          >
            {item?.title}
          </Text>
          <View style={screenStyles.actionContainer}>
            <TouchableOpacity
              style={screenStyles.actionBox}
              onPress={() =>
                navigation.navigate('courseCarouselPage', {
                  ...item,
                  id: item.id,
                  isCompleted: item.isCompleted,
                })
              }
            >
              <FontAwesome name="book" size={20} color={'black'} />
              <Text style={screenStyles.text}>Read</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={screenStyles.actionBox}
              onPress={() => setIsModalVisible(!isModalVisible)}
            >
              <Feather name="speaker" size={20} color={'black'} />
              <Text style={screenStyles.text}>Listen</Text>
            </TouchableOpacity>
          </View>
        </View>
        {!isArticle ? <View style={screenStyles.col2}>
          {item.isCompleted ? (
            <Image
              source={{
                uri: 'https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/success-green-check-mark-icon.png',
              }}
              style={screenStyles.thumbnail}
            />
          ) : (
            <Image
              source={{ uri: item?.thumbnail }}
              style={screenStyles.thumbnail}
            />
          )}
        </View>
          :
          <View style={screenStyles.col2}>
            <TouchableOpacity onPress={handleDelete}>
              <Feather name='trash' size={30} color={'red'} />
            </TouchableOpacity>
          </View>
        }
      </View>
      <PlayerModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        playAudio={playAudio}
        pauseAudio={pauseAudio}
        replayTrack={replayTrack}
        item={item}
        seekToPosition={seekToPosition}
      />
    </>
  );
};

export default CourseItem;
