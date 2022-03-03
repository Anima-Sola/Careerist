import { saveDataToStore } from '../../components/FileSystem';

export const initialState = {
    isGameStarted: false
}

export const appSettingsReducer = ( state = initialState, action ) => {
    let newState = {};
    switch( action.type ) {
        case 'SAVE_APP_SETTINGS_INITIAL_STATE':
            saveDataToStore( 'APP_SETTINGS', initialState);
            return state;
        case 'SET_IS_GAME_STARTED':
            newState = { ...state, isGameStarted: action.payload }
            saveDataToStore( 'APP_SETTINGS', newState );
            return newState;
        case 'LOAD_APP_SETTINGS':
            if ( action.payload ) return action.payload;
            return state;
        default:
            return state;
    }
}