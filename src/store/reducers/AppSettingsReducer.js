import { saveDataToStore } from '../../components/FileSystem';

export const initialState = {
    isGameStarted: false
}

const saveState = ( state, param, payload, saveStateToStore ) => {
    state[ param ] = payload;
    if( saveStateToStore ) saveDataToStore( 'APP_SETTINGS', state );
    return state;
}

export const appSettingsReducer = ( state = initialState, action ) => {
    let newState = {};
    switch( action.type ) {
        case 'SAVE_APP_SETTINGS_INITIAL_STATE':
            saveDataToStore( 'APP_SETTINGS', initialState);
            return initialState;
        case 'SET_IS_GAME_STARTED':
            return saveState( state, 'isGameStarted', action.payload, action.saveStateToStore );
        case 'LOAD_APP_SETTINGS':
            if ( action.payload ) return action.payload;
            return state;
        default:
            return state;
    }
}