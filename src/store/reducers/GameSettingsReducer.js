import { saveDataToStore } from '../../components/FileSystem';

const initialState = {
    gameDifficultyLevel: 3,
    playerAge: 18,
    year: 2022,
    
    cash: 1500,            //Сумма налички

    currentSocialStatus: 0 //0 - Бизнесмен, 1 - лидер профсоюза мусорщиков, 2 - шериф, 3 - сенатор, 4 - президент
}

export const gameSettingsReducer = ( state = initialState, action ) => {
    let newState = {};
    switch( action.type ) {
        case 'SAVE_GAME_SETTINGS_INITIAL_STATE':
            saveDataToStore( 'GAME_SETTINGS', initialState );
            return state;
        case 'SET_YEAR':
            newState = { ...state, year: action.payload }
            saveDataToStore( 'GAME_SETTINGS', newState );
            return newState;
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
        case 'SET_SOCIAL_STATUS':
            newState = { ...state, socialStatus: action.payload }
            saveDataToStore( 'GAME_SETTINGS', newState );
            return newState;
        case 'LOAD_GAME_SETTINGS':
            if ( action.payload ) return action.payload;
            return state;
        default:
            return state;
    }
}