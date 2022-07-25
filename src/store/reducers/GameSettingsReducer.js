import { saveDataToStore } from '../../components/FileSystem';

const initialState = {
    gameDifficultyLevel: 3,                             // Уровень сложности
    playerAge: 18,                                      // Возраст игрока
    year: new Date().getFullYear(),                     // Стартовый год
    
    cash: 1500,                                         // Сумма налички

    currentSocialStatus: 0,                                     // 0 - Бизнесмен, 1 - лидер профсоюза мусорщиков, 2 - шериф, 3 - сенатор, 4 - президент
    isElectionOverOrNotHeld: false,                             // Флаг, прошли ли выборы или они не проводятся
    possession: [ false, false, false, false, false ],          // Наличие - true / Отсутствие - false квартиры, машины, виллы, яхты, самолета
    possessionCost: [ 0, 0, 0, 0, 0],                           // Цена недвижимости
    employees: [ false, false, false, false, false ],           // Наличие - true / Отсутствие - false маклера, врача, адвоката, детектива, личной охраны
    employeesSalary: [ 0, 0, 0, 0, 0],                          // Зарплата подчиненных
    business: [ false, false, false, false, false ],            // Наличие - true / Отсутствие - false бара, ресторана, магазина, отеля, завода
    businessCost: [ 0, 0, 0, 0, 0 ],                            // Цена бизнеса
    stocksQuantity: [ 0, 0, 0, 0, 0 ],                          // Количество акций каждой компании в собственности
    avgStocksCost: [ 0, 0, 0, 0, 0 ],                           // Средние цены купленных акций
    insuredPossession: [ false, false, false, false, false ],   // Застрахована - true / Не застраховано - false квартира, машина, вилла, яхта, самолет
    insuranceCost: [ 0, 0, 0, 0, 0 ],                           // Сумма, накоторую застраховано имущество
}

const saveState = ( state, param, payload ) => {
    state[ param ] = payload;
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
        case 'SET_POSSESSION_LIST':
            return saveState( state, 'possession', action.payload );
        case 'SET_POSSESSION_COST_LIST':
            return saveState( state, 'possessionCost', action.payload );
        case 'SET_EMPLOYEES_LIST':
            return saveState( state, 'employees', action.payload );
        case 'SET_EMPLOYEES_SALARY_LIST':
            return saveState( state, 'employeesSalary', action.payload );
        case 'SET_BUSINESS_LIST':
            return saveState( state, 'business', action.payload );
        case 'SET_BUSINESS_COST_LIST':
            return saveState( state, 'businessCost', action.payload );
        case 'SET_STOCKS_QUANTITY_LIST':
            return saveState( state, 'stocksQuantity', action.payload );
        case 'SET_AVG_STOCKS_COST_LIST':
            return saveState( state, 'avgStocksCost', action.payload );
        case 'SET_INSURED_POSSESSION_LIST':
            return saveState( state, 'insuredPossession', action.payload );
        case 'SET_INSURANCE_COST_LIST':
            return saveState( state, 'insuranceCost', action.payload );
        case 'LOAD_GAME_SETTINGS':
            if ( action.payload ) return action.payload;
            return state;
        default:
            return state;
    }
}