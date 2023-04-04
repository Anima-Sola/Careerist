import { Audio } from 'expo-av';
import { Vibration } from 'react-native';
import store from '../store';

const Jazz = require('../assets/music/jazz.wav');
const Relax = require('../assets/music/relax.wav');
const Positive = require('../assets/music/positive.wav');
const Funk = require('../assets/music/funk.wav');
const Funny = require('../assets/music/funny.wav');

const backgroundTracks = [ Jazz, Relax, Positive, Funk, Funny ];

export const playBackgroundTrack = async () => {
    const { currentBackgroundTrack, backgroundTrackVolume } = store.getState().appSettingsReducer.soundSettings;
    const { sound } = await Audio.Sound.createAsync( backgroundTracks[ currentBackgroundTrack ] );
    await sound.setVolumeAsync( backgroundTrackVolume );
    await sound.setIsLoopingAsync( true );
    await sound.playAsync();
}

export const playSwoosh = async () => {
    const { sound } = await Audio.Sound.createAsync( require('../assets/sounds/swoosh.mp3') );
    await sound.playAsync();   
}

export const playSlideChange= async () => {
    const { soundsVolume } = store.getState().appSettingsReducer.soundSettings;
    const { sound } = await Audio.Sound.createAsync( require('../assets/sounds/slidechange.mp3') );
    await sound.setVolumeAsync( soundsVolume );
    Vibration.vibrate(30);
    await sound.playAsync();   
}

export const playButtonClick= async () => {
    const { soundsVolume } = store.getState().appSettingsReducer.soundSettings;
    const { sound } = await Audio.Sound.createAsync( require('../assets/sounds/buttonclick.mp3') );
    await sound.setVolumeAsync( soundsVolume );
    Vibration.vibrate(30);
    await sound.playAsync();   
}