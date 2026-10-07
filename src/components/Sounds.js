import { createAudioPlayer } from 'expo-audio';
import { Vibration } from 'react-native';
import store from '../store';

const EmergeSound = require('../assets/music/emerge.mp3');
const Jazz = require('../assets/music/jazz.mp3');
const Sunrise = require('../assets/music/sunrise.mp3');
const Country = require('../assets/music/country.mp3');
const Calm = require('../assets/music/calm.mp3');
const Fiesta = require('../assets/music/fiesta.mp3');
const Tush = require('../assets/music/tush.mp3');
const Marsh = require('../assets/music/marsh.mp3');

const buttonClickSound = require('../assets/sounds/buttonclick.mp3');
const slideChangeSound = require('../assets/sounds/slidechange.mp3');
const dingSound = require('../assets/sounds/ding.mp3');
const swooshSound = require('../assets/sounds/swoosh.mp3');

const backgroundTracks = [ Jazz, Sunrise, Country, Calm, Fiesta ];

// Единый плеер для фоновых (зацикленных) треков
//const trackPlayer = createAudioPlayer();
let trackPlayer = null;

const getTrackPlayer = () => {
    if (!trackPlayer) {
        trackPlayer = createAudioPlayer();
    }

    return trackPlayer;
};

export const setBackgroundTrackVolume = () => {
    const { isMusicEnabled, backgroundTrackVolume } = store.getState().appSettingsReducer.soundSettings;
    if ( isMusicEnabled ) {
        try {
            trackPlayer.volume = backgroundTrackVolume;
        } catch ( error ) {
            console.log( error );
        }
    }
}

export const stopBackgroundTrack = () => {
    if (!trackPlayer) return;

    try {
        trackPlayer.pause();
        trackPlayer.seekTo(0);
    } catch (error) {
        console.log('stopBackgroundTrack:', error);
    }
};

export const playBackgroundTrack = () => {
    const {
        currentBackgroundTrack,
        isMusicEnabled,
        backgroundTrackVolume
    } = store.getState().appSettingsReducer.soundSettings;

    if (!isMusicEnabled) return;

    try {
        const player = getTrackPlayer();

        player.replace(backgroundTracks[currentBackgroundTrack]);
        player.volume = backgroundTrackVolume;
        player.loop = true;
        player.play();
    } catch (error) {
        console.log('playBackgroundTrack:', error);
    }
};

export const playTushTrack = () => {
    const { isMusicEnabled, backgroundTrackVolume } = store.getState().appSettingsReducer.soundSettings;
    if ( isMusicEnabled ) {
        try {
            trackPlayer.replace( Tush );
            trackPlayer.volume = backgroundTrackVolume;
            trackPlayer.loop = true;
            trackPlayer.play();
        } catch ( error ) {
            console.log( error );
        }
    }
}

export const playMarshTrack = () => {
    const { isMusicEnabled, backgroundTrackVolume } = store.getState().appSettingsReducer.soundSettings;
    if ( isMusicEnabled ) {
        try {
            trackPlayer.replace( Marsh );
            trackPlayer.volume = backgroundTrackVolume;
            trackPlayer.loop = true;
            trackPlayer.play();
        } catch ( error ) {
            console.log( error );
        }
    }
}

// Играть трек emerge при первом запуске игры
export const playEmergeTrack = () => {
    const { backgroundTrackVolume } = store.getState().appSettingsReducer.soundSettings;
    try {
        const emergePlayer = createAudioPlayer( EmergeSound );
        emergePlayer.volume = backgroundTrackVolume;

        const subscription = emergePlayer.addListener( 'playbackStatusUpdate', ( status ) => {
            if ( !status.didJustFinish ) return;
            subscription.remove();
            emergePlayer.remove();
            setTimeout( () => playBackgroundTrack(), 300 );
        });

        emergePlayer.play();
    } catch ( error ) {
        console.log( error );
    }
}

// Воспроизведение коротких звуков
const playSound = ( audioFile ) => {
    const { isSoundsEnabled, soundsVolume } = store.getState().appSettingsReducer.soundSettings;
    Vibration.vibrate( 30 );
    if ( isSoundsEnabled ) {
        try {
            const soundPlayer = createAudioPlayer( audioFile );
            soundPlayer.volume = soundsVolume;

            const subscription = soundPlayer.addListener( 'playbackStatusUpdate', ( status ) => {
                if ( !status.didJustFinish ) return;
                subscription.remove();
                soundPlayer.remove();
            });

            soundPlayer.play();
        } catch ( error ) {
            console.log( error );
        }
    }
}

export const playButtonClick = () => {
    playSound( buttonClickSound );
}

export const playSlideChange = () => {
    playSound( slideChangeSound );
}

export const playDing = () => {
    playSound( dingSound );
}

export const playSwoosh = () => {
    playSound( swooshSound );
}