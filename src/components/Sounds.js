import { Audio } from 'expo-av';
import { Vibration } from 'react-native';
import store from '../store';

const EmergeSound = require('../assets/music/emerge.mp3');
const Jazz = require('../assets/music/jazz.mp3');
const Relax = require('../assets/music/relax.wav');
const Positive = require('../assets/music/positive.wav');
const Funk = require('../assets/music/funk.wav');
const Funny = require('../assets/music/funny.wav');

const buttonClickSound = require('../assets/sounds/buttonclick.mp3');
const slideChangeSound = require('../assets/sounds/slidechange.mp3');
const dingSound = require('../assets/sounds/ding.mp3');
const swooshSound = require('../assets/sounds/swoosh.mp3');

const backgroundTracks = [ Jazz, Relax, Positive, Funk, Funny ];

//Play tracks
const trackSoundObject = new Audio.Sound();

export const setBackgroundTrackVolume = async () => {
    const { backgroundTrackVolume  } = store.getState().appSettingsReducer.soundSettings;
    if( isMusicEnabled ) {
        try {
            await trackSoundObject.setVolumeAsync( backgroundTrackVolume );
        } catch ( error ) {
            console.log( error );
        }
    }
}

export const stopBackgroundTrack = async () => {
    const { isMusicEnabled } = store.getState().appSettingsReducer.soundSettings;
    if( isMusicEnabled ) {
        try {
            await trackSoundObject.stopAsync();
            trackSoundObject.unloadAsync();
        } catch ( error ) {
            console.log( error );
        }
    }
}

export const playBackgroundTrack = async () => {
    const { currentBackgroundTrack, isMusicEnabled, backgroundTrackVolume } = store.getState().appSettingsReducer.soundSettings;
    if( isMusicEnabled ) {
        try {
            await trackSoundObject.loadAsync( backgroundTracks[ currentBackgroundTrack ] );
            await trackSoundObject.setVolumeAsync( backgroundTrackVolume );
            await trackSoundObject.setIsLoopingAsync( true );
            await trackSoundObject.playAsync();
        } catch ( error ) {
            console.log( error );
        }
    }
}

//Play emegre track if the game starts first time
export const playEmergeTrack = async () => {
    const { backgroundTrackVolume } = store.getState().appSettingsReducer.soundSettings;
    try {
        const emergeSoundObject = new Audio.Sound();
        emergeSoundObject.setOnPlaybackStatusUpdate(( status ) => {
            if ( !status.didJustFinish ) return;
            emergeSoundObject.unloadAsync();
            playBackgroundTrack();
        });
        await emergeSoundObject.loadAsync( EmergeSound );
        await emergeSoundObject.setVolumeAsync( backgroundTrackVolume );
        await emergeSoundObject.playAsync();
    } catch ( error ) {
        console.log( error );
    }
}

//Play sounds
const playSound = async ( audioFile ) => {
    const { isSoundsEnabled, soundsVolume } = store.getState().appSettingsReducer.soundSettings;
    Vibration.vibrate(30);
    if( isSoundsEnabled ) {
        const soundObject = new Audio.Sound();
        try {
            soundObject.setOnPlaybackStatusUpdate(( status ) => {
                if ( !status.didJustFinish ) return;
                soundObject.unloadAsync();
            });
            await soundObject.loadAsync( audioFile );
            await soundObject.setVolumeAsync( soundsVolume );
            await soundObject.playAsync();
        } catch ( error ) {
            console.log( error );
        }
    }
}

export const playButtonClick= async () => {
    playSound( buttonClickSound );
}

export const playSlideChange= async () => {
    playSound( slideChangeSound ); 
}

export const playDing = async () => {
    playSound( dingSound ); 
}

export const playSwoosh = async () => {
    playSound( swooshSound ); 
}