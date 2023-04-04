import { saveDataToStore } from '../../components/FileSystem';

export const initialState = {
    soundSettings: {
        currentBackgroundTrack: 0,
        backgroundTrackVolume: 0.05,
        soundsVolume: 0.8
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
        case 'SET_CURRENT_BACKGROUND_TRACK':
            return saveState( state, 'currentBackgroundTrack', action );
        case 'LOAD_APP_SETTINGS':
            if ( action.payload ) return action.payload;
            return state;
        default:
            return state;
    }
}