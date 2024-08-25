import TrackPlayer, { Event, State } from 'react-native-track-player';

// Define the playback service function
export async function playBackService() {
  // Handle remote play events
  TrackPlayer.addEventListener(Event.RemotePlay, async () => {
    try {
      await TrackPlayer.play();
    } catch (error) {
      console.error('Error playing track:', error);
    }
  });

  // Handle remote pause events
  TrackPlayer.addEventListener(Event.RemotePause, async () => {
    try {
      await TrackPlayer.pause();
    } catch (error) {
      console.error('Error pausing track:', error);
    }
  });

  // Handle remote next track events
  TrackPlayer.addEventListener(Event.RemoteNext, async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch (error) {
      console.error('Error skipping to next track:', error);
    }
  });

  // Handle remote previous track events
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
    const status = await TrackPlayer.getState();
    if (status === State.Ready || status === State.Playing) {
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
