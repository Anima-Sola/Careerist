import { saveDataToStore } from '../../components/FileSystem';

const initialState = {
    gameDifficultyLevel: 3,          // Уровень сложности
    playerAge: 18,                   // Возраст игрока
    year: new Date().getFullYear(),  // Стартовый год
    
    cash: 1500,                      // Сумма налички

    currentSocialStatus: 0,          // 0 - Бизнесмен, 1 - лидер профсоюза мусорщиков, 2 - шериф, 3 - сенатор, 4 - президент
    isElectionOverOrNotHeld: false   // Флаг, прошли ли выборы или они не проводятся
}

const saveState = ( state, param, payload ) => {
    state[param] = payload;
    saveDataToStore( 'GAME_SETTINGS', state );
    return state;
}

export const gameSettingsReducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case 'SAVE_GAME_SETTINGS_INITIAL_STATE':
            saveDataToStore( 'GAME_SETTINGS', initialState );
            return initialState;
        case 'SET_YEAR':
            return saveState( state, 'year', action.payload );
        case 'SET_GAME_DIFFICULTY_LEVEL':
            return saveState( state, 'gameDifficultyLevel', action.payload );
        case 'SET_PLAYER_AGE':
            return saveState( state, 'playerAge', action.payload );
        case 'SET_CASH_AMOUNT':
            return saveState( state, 'cash', action.payload );
        case 'SET_SOCIAL_STATUS':
            return saveState( state, 'currentSocialStatus', action.payload );
        case 'SET_IS_ELECTION_OVER_OR_NOT_HELD':
            return saveState( state, 'isElectionOverOrNotHeld', action.payload );
        case 'LOAD_GAME_SETTINGS':
            if ( action.payload ) return action.payload;
            return state;
        default:
            return state;
    }
}