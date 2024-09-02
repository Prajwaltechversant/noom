import React, { useEffect, useState } from 'react';
import { View, Modal, Text, Pressable, TouchableOpacity, Alert } from 'react-native';
import { useScreenContext } from '../../../context/screenContext';
import styles from './style';
import textStyle from '../../../style/text/style';
import { colorPalette } from '../../../assets/colorpalette/colorPalette';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import TrackPlayer, { Event, State, PlaybackErrorEvent } from 'react-native-track-player';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { setupPlayer } from '../../../../musicPlayerService';

type Props = {
  isModalVisible: boolean;
  setIsModalVisible: (v: boolean) => void;
  playAudio: () => Promise<void>;
  pauseAudio: () => Promise<void>;
  replayTrack: () => Promise<void>;
  item: any;
  seekToPosition: (position: number) => void;
};

const PlayerModal: React.FC<Props> = ({
  isModalVisible,
  setIsModalVisible,
  playAudio,
  pauseAudio,
  replayTrack,
  item,
  seekToPosition
}) => {
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [end, setEnd] = useState(false);
  const currentUid = auth().currentUser?.uid;

  const screenContext = useScreenContext();
  const { width, height, isPortrait } = screenContext;
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width
  );


  useEffect(() => {
    const handlePlaybackStateChange = (event: { state: State }) => {
      if (event.state === State.Ended) {
        setEnd(true);
        setIsPlaying(false);
      } else {
        setEnd(false);
      }
    };

    const handlePlaybackError = (event: PlaybackErrorEvent) => {
      // Alert.alert(event.message)
      // console.log(event.message)

    };

    TrackPlayer.addEventListener(Event.PlaybackState, handlePlaybackStateChange);
    TrackPlayer.addEventListener(Event.PlaybackError, handlePlaybackError);

  }, []);

  useEffect(() => {
    const updateProgress = setInterval(async () => {
      try {
        const progress = await TrackPlayer.getProgress();
        setProgress(progress.position);
        setDuration(progress.duration);
      } catch (error) {
        // Alert.alert((error as Error).message)
      }
    }, 1000);

    return () => clearInterval(updateProgress);
  }, []);

  const handlePlay = async () => {
    try {
      await playAudio();
      setIsPlaying(true);
    } catch (error) {
      // Alert.alert((error as Error).message)
    }
  };

  const handlePause = async () => {
    try {
      await pauseAudio();
      setIsPlaying(false);
    } catch (error) {
      // Alert.alert((error as Error).message)
    }
  };

  const handleRestart = async () => {
    try {
      await replayTrack();
      setIsPlaying(true);
      setEnd(false);
      setProgress(0);
    } catch (error) {
      // Alert.alert((error as Error).message)
    }
  };

  const handleSeek = (value: number) => {
    seekToPosition(value);
    TrackPlayer.seekTo(value).catch(error => Alert.alert((error as Error).message)
    );
  };

  const closePlayer = async () => {
    try {
      await pauseAudio();
      setIsModalVisible(false);
      setProgress(0);
      if (end && currentUid) {
        await firestore()
          .collection(`UserData/${currentUid}/dailyCourse`)
          .doc(item.id)
          .update({ isCompleted: true });
      }
    } catch (error) {
      // Alert.alert((error as Error).message)
    }
  };

  return (
    <View style={screenStyles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={screenStyles.centeredView}>
          <View style={screenStyles.modalView}>
            <Text style={[textStyle.questionText, { textTransform: 'uppercase' }]}>{item.title}</Text>

            <View style={screenStyles.controlls}>
              <View style={screenStyles.slider}>
                <Text style={textStyle.labelText}>0</Text>
                <Slider
                  style={{ width: 200, height: 40 }}
                  minimumValue={0}
                  maximumValue={duration}
                  minimumTrackTintColor={colorPalette.btnPrimary}
                  maximumTrackTintColor={colorPalette.cherry}
                  onValueChange={handleSeek}
                  value={progress}
                />
                <Text style={[textStyle.labelText,]}>{progress.toFixed(0)}</Text>
              </View>

              {!end ? (
                isPlaying ? (
                  <TouchableOpacity onPress={handlePause}>
                    <AntDesign name="pausecircle" color={colorPalette.black} size={30} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={handlePlay}>
                    <AntDesign name="play" color={colorPalette.black} size={30} />
                  </TouchableOpacity>
                )
              ) : (
                <TouchableOpacity onPress={handleRestart}>
                  <MaterialIcons name="restart-alt" color={colorPalette.black} size={30} />
                </TouchableOpacity>
              )}
            </View>

            <Pressable style={[screenStyles.button, screenStyles.buttonClose]} onPress={closePlayer}>
              <MaterialIcons name="close" color={colorPalette.white} size={20} />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PlayerModal;
