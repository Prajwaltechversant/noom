import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { useScreenContext } from '../../../context/screenContext';
import textStyle from '../../../style/text/style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { CourseType } from '../../../types/types';
import PlayerModal from '../playerModal'; // Ensure the path is correct
import { setupPlayer } from '../../../../musicPlayerService';
import TrackPlayer from 'react-native-track-player';

interface Props {
  item: CourseType;
}

const CourseItem: React.FC<Props> = ({ item }) => {
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
          url: item.audio,
          title: item.title,
          artist: 'Track Artist',
          artwork: '<https://example.com/track.jpg>',
        });
      }
      setIsPlayerReady(isSetup);
      TrackPlayer.getProgress().then((progress) => console.log(progress))
    } catch (error) {
      console.error('Error setting up player:', error);
    }
  };

  useEffect(() => {
    setupPlayerReady();

    return () => {
      TrackPlayer.reset();
    };
  }, []);

  const playAudio = async () => {
    try {
      await TrackPlayer.play();
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const pauseAudio = async () => {
    try {
      await TrackPlayer.pause();
    } catch (error) {
      console.error('Error pausing audio:', error);
    }
  };
  const replayTrack = async () => {
    try {
      await TrackPlayer.seekTo(0);
      await TrackPlayer.play();
    } catch (error) {
      console.error('Error replaying track:', error);
    }
  };

  const seekToPosition = async (pos: number) => {
    try {
      await TrackPlayer.seekTo(pos);
      

    } catch (error) {
      console.error('Error seeking:', error);

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
          {/* <Text style={screenStyles.text}>{trackDuration}</Text> */}
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
              source={{ uri: item?.thumbnail }}
              style={screenStyles.thumbnail}
            />
          )}
        </View>

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
