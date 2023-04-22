import { saveDataToStore } from '../../components/FileSystem';

export const initialState = {
    soundSettings: {
        navFromGameMainScreen: false,
        currentBackgroundTrack: 1,
        isMusicEnabled: true,
        backgroundTrackVolume: 0.15,
        isSoundsEnabled: true,
        soundsVolume: 0.15,
    }    
}

const saveState = ( state, param, action ) => {
    const { payload, settingsSection, saveStateToStore } = action;
    const newState = { ...state };
    newState[ settingsSection ][ param ] = payload;
    if( saveStateToStore ) saveDataToStore( 'APP_SETTINGS', newState );
    return newState;
}


export const appSettingsReducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case 'SAVE_APP_SETTINGS_INITIAL_STATE':
            saveDataToStore( 'APP_SETTINGS', initialState);
            return initialState;
        case 'SET_NAV_FROM_GAME_MAIN_SCREEN':
            return saveState( state, 'navFromGameMainScreen', action );
        case 'SET_CURRENT_BACKGROUND_TRACK':
            return saveState( state, 'currentBackgroundTrack', action );
        case 'SET_IS_MUSIC_ENABLED':
            return saveState( state, 'isMusicEnabled', action );
        case 'SET_BACKGROUND_TRACK_VOLUME':
            return saveState( state, 'backgroundTrackVolume', action );
        case 'SET_IS_SOUNDS_ENABLED':
            return saveState( state, 'isSoundsEnabled', action );
        case 'SET_SOUNDS_VOLUME':
            return saveState( state, 'soundsVolume', action );
        case 'LOAD_APP_SETTINGS':
            if ( action.payload ) return action.payload;
            return state;
        default:
            return state;
    }
}