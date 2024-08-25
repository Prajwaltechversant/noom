/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { playBackService } from './musicPlayerService';
import TrackPlayer from 'react-native-track-player';
TrackPlayer.registerPlaybackService(() => playBackService);

import App from './App';
import {name as appName} from './app.json';



AppRegistry.registerComponent(appName, () => App);
