import { Audio } from 'expo-av';
import { Vibration } from 'react-native';
import store from '../store';

const EmergeSound = require('../assets/music/emerge.mp3');
const Jazz = require('../assets/music/jazz.wav');
const Relax = require('../assets/music/relax.wav');
const Positive = require('../assets/music/positive.wav');
const Funk = require('../assets/music/funk.wav');
const Funny = require('../assets/music/funny.wav');

const buttonClickSound = require('../assets/sounds/buttonclick.mp3');
const slideChangeSound = require('../assets/sounds/slidechange.mp3');
const swooshSound = require('../assets/sounds/swoosh.mp3');

const backgroundTracks = [ Jazz, Relax, Positive, Funk, Funny ];

const playTrack = async ( soundFile, looping ) => {
    const { backgroundTrackVolume } = store.getState().appSettingsReducer.soundSettings;
    const { sound } = await Audio.Sound.createAsync( soundFile );
    await sound.setVolumeAsync( backgroundTrackVolume );
    await sound.setIsLoopingAsync( looping );
    await sound.playAsync();
}

const playSound = async ( soundFile ) => {
    const { soundsVolume } = store.getState().appSettingsReducer.soundSettings;
    const { sound } = await Audio.Sound.createAsync( soundFile );
    await sound.setVolumeAsync( soundsVolume );
    Vibration.vibrate(30);
    await sound.playAsync();   
}

export const playBackgroundTrack = async () => {
    const { currentBackgroundTrack } = store.getState().appSettingsReducer.soundSettings;
    playTrack( backgroundTracks[ currentBackgroundTrack ], true );
}

export const playEmergeTrack = () => {
    playTrack( EmergeSound, false );
}

export const playButtonClick= async () => {
    playSound( buttonClickSound );
}

export const playSlideChange= async () => {
    playSound( slideChangeSound ); 
}

export const playSwoosh = async () => {
    playSound( swooshSound ); 
}