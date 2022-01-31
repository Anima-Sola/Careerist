import { saveDataToStore } from '../../components/FileSystem';
import { appSettingsInitialState } from './loadInitialState';

/*export const initialState = {
    isIntroShown: false,
    isGameStarted: false
}*/

export const appSettingsReducer = ( state = appSettingsInitialState, action ) => {
    let newState = {};
    switch( action.type ) {
        case 'SET_IS_INTRO_SHOWN':
            newState = { ...state, isIntroShown: action.payload }
            saveDataToStore( 'APP_SETTINGS', newState );
            return newState;
        case 'SET_IS_GAME_STARTED':
            newState = { ...state, isGameStarted: action.payload }
            saveDataToStore( 'APP_SETTINGS', newState );
            return newState;
        default:
            return state;
    }
}