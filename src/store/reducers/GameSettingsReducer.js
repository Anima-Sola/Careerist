import { saveDataToStore } from '../../components/FileSystem';
import { gameSettingsInitialState } from './loadInitialState';

/*const initialState = {
    gameDifficultyLevel: 3,
    playerAge: 18,
    
    cash: 1500
}*/

export const gameSettingsReducer = ( state = gameSettingsInitialState, action ) => {
    let newState = {};
    switch( action.type ) {
        case 'SET_GAME_DIFFICULTY_LEVEL':
            newState = { ...state, gameDifficultyLevel: action.payload }
            saveDataToStore( 'GAME_SETTINGS', newState );
            return newState;
        case 'SET_PLAYER_AGE':
            newState = { ...state, playerAge: action.payload }
            saveDataToStore( 'GAME_SETTINGS', newState );
            return newState;
        case 'SET_CASH_AMOUNT':
            newState = { ...state, cash: action.payload }
            saveDataToStore( 'GAME_SETTINGS', newState );
            return newState;
        default:
            return state;
    }
}