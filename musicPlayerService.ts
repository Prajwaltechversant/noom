import TrackPlayer, { Event, State } from 'react-native-track-player';
import { getPlaybackState } from 'react-native-track-player/lib/src/trackPlayer';

export async function playBackService() {
  TrackPlayer.addEventListener(Event.RemotePlay, async () => {
    try {
      await TrackPlayer.play();
    } catch (error) {
      console.error('Error playing track:', error);
    }
  });

  TrackPlayer.addEventListener(Event.RemotePause, async () => {
    try {
      await TrackPlayer.pause();
    } catch (error) {
      console.error('Error pausing track:', error);
    }
  });

  TrackPlayer.addEventListener(Event.RemoteNext, async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch (error) {
      console.error('Error skipping to next track:', error);
    }
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (error) {
      console.error('Error skipping to previous track:', error);
    }
  });
}

export async function setupPlayer(): Promise<boolean> {
  let isSetup = false;

  try {
    const status = await getPlaybackState();
    if (status.state === State.Ready || status.state === State.Playing) {
      isSetup = true;
    }
  } catch (error) {
    try {
      await TrackPlayer.setupPlayer();
      isSetup = true;
    } catch (setupError) {
      console.error('Error setting up player:', setupError);
    }
  }

  return isSetup;
}
