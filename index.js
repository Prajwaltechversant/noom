/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import TrackPlayer from 'react-native-track-player';
import { playBackService } from './musicPlayerService';

TrackPlayer.registerPlaybackService(() => playBackService);

AppRegistry.registerComponent(appName, () => App);

