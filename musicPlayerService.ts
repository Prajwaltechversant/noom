import TrackPlayer,{Event  } from 'react-native-track-player';

export async function playBackService() {

    TrackPlayer.addEventListener(Event.RemotePause, () => {
        TrackPlayer.pause()
    })

    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play()
    })

    TrackPlayer.addEventListener(Event.RemoteNext, () => {
        TrackPlayer.skipToNext()
    })

    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        TrackPlayer.skipToPrevious()
    })




}

export async function setupPlayer() {

    let isSetup = false;
    try {
        await TrackPlayer.getActiveTrackIndex()
        isSetup = true;

    } catch (error) {
        await TrackPlayer.setupPlayer()
        isSetup = true;

    }
    finally {
        return isSetup;

    }

}