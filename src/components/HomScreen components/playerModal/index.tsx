import { View, Modal, Text, Alert, Pressable, TouchableOpacity } from 'react-native';
import React, { Dispatch, useEffect, useState } from 'react';
// import {
//   Modal,
//   Portal,
//   Text,
//   Button,
//   PaperProvider,
//   ModalProps,
// } from 'react-native-paper';
import { useScreenContext } from '../../../context/screenContext';
import styles from './style';
import textStyle from '../../../style/text/style';
import { colorPalette } from '../../../assets/colorpalette/colorPalette';
import AntDesign from 'react-native-vector-icons/AntDesign';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { ModalProps } from 'react-native-paper';
import { StatusBar } from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, { Event, State, useTrackPlayerEvents } from 'react-native-track-player';
type Props = {
  // children: React.ReactNode;
  isModalVisible: boolean,
  setIsModalVisible: (v: boolean) => void,
  playAudio: () => void,
  pauseAudio: () => void,
  replayTrack: () => void,
  item: any,
  seekToPosition: (a: number) => void
};
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
type ModalProp = Props & ModalProps;

const PlayerModal: React.FC<Props> = ({ isModalVisible, setIsModalVisible, playAudio, pauseAudio, replayTrack, item, seekToPosition }) => {
  const [modalVisible, setModalVisible] = useState(isModalVisible);
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)
  const currentUid = auth().currentUser?.uid

  const containerStyle = { backgroundColor: colorPalette.white };
  const screenContext = useScreenContext();
  const [isPlaying, setIsPlaying] = useState(false)
  const { width, height, isPortrait } = screenContext;
  const [end, setEnd] = useState(false)
  const screenStyles = styles(
    screenContext,
    isPortrait ? width : height,
    isPortrait ? height : width,
  );

  useEffect(() => {
    TrackPlayer.getProgress().then((progress) => {
      setDuration(progress.duration)
    })
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      TrackPlayer.getProgress().then((progress) => setProgress(progress.position))
    }, 1000)

    return () => clearInterval(intervalId);
  }, []);
  const handlePlay = async () => {
    await playAudio()
    setIsPlaying(!isPlaying)
  }
  console.log(item.id)
  const handlePause = async () => {
    await pauseAudio()
    setIsPlaying(!isPlaying)
  }

  useTrackPlayerEvents([Event.PlaybackState,], async (event) => {
    if (event.type === Event.PlaybackState) {
      if (event.state === State.Ended) {
        console.log('Track has ended');
        setEnd(true)
        setIsPlaying(!isPlaying)
      } else {
        setEnd(false)
      }
    }
  });
  const handleRestart = async () => {
    await replayTrack()
    setIsPlaying(!isPlaying)
    setEnd(false)
    setProgress(0)
  }

  const closePlayer = async () => {
    await pauseAudio();
    setIsModalVisible(false)
    setProgress(0)

    if(end){
      firestore()
            .collection(`UserData/${currentUid}/dailyCourse`)
            .doc('id')
            .update({
              isCompleted: true,
            })
            .then(() => {
            });
    }
  }
  return (
    <View style={screenStyles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={screenStyles.centeredView}>
          <View style={screenStyles.modalView}>
            <Text style={textStyle.labelText}>{item.title}</Text>

            <View style={screenStyles.controlls}>
              <View style={screenStyles.slider}>
                <Text style={textStyle.labelText}>0</Text>
                <Slider
                  style={{ width: 200, height: 40 }}
                  minimumValue={0}
                  maximumValue={duration}
                  minimumTrackTintColor={colorPalette.btnPrimary}
                  maximumTrackTintColor={colorPalette.cherry}
                  onValueChange={(e) => seekToPosition(e)}
                  value={progress}
                />
                <Text style={textStyle.labelText}>{progress.toFixed(0)}</Text>

              </View>
              {!end ? (isPlaying ?
                (< TouchableOpacity onPress={handlePause}>
                  <AntDesign name='pausecircle' color={colorPalette.black} size={30} />
                </TouchableOpacity>)
                :
                (< TouchableOpacity onPress={handlePlay}>
                  <AntDesign name='play' color={colorPalette.black} size={30} />
                </TouchableOpacity>))
                :
                (< TouchableOpacity onPress={handleRestart}>
                  <MaterialIcons name='restart-alt' color={colorPalette.black} size={30} />
                </TouchableOpacity>)
              }
            </View>
            <Pressable
              style={[screenStyles.button, screenStyles.buttonClose]}
              onPress={closePlayer}>
              <MaterialIcons name='close' color={colorPalette.white} size={20} />
            </Pressable>
          </View>
        </View>
      </Modal >
    </View >
  );
};

export default PlayerModal;
