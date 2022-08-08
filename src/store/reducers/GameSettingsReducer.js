import { saveDataToStore } from '../../components/FileSystem';

const initialState = {
    gameDifficultyLevel: 3,                                     // Уровень сложности
    playerAge: 18,                                              // Возраст игрока
    deathAge: 120,                                              // Дата смерти игрока
    year: new Date().getFullYear(),                             // Стартовый год
    posWithinYear: 0,                                           // Позиция внутри года
    endOfYear: 10,                                              // Маркер конца года
    
    cash: 1500,                                                 // Сумма налички

    currentSocialStatus: 0,                                     // 0 - Бизнесмен, 1 - лидер профсоюза мусорщиков, 2 - шериф, 3 - сенатор, 4 - президент
    isElectionOverOrNotHeld: false,                             // Флаг, прошли ли выборы или они не проводятся

    possessionList: [ false, false, false, false, false ],      // Наличие - true / Отсутствие - false квартиры, машины, виллы, яхты, самолета
    possessionBuyCostList: [ 0, 0, 0, 0, 0 ],                   // Цена покупки имущества
    possessionSellCostList: [ 0, 0, 0, 0, 0 ],                  // Цена продажи имущества

    businessList: [ false, false, false, false, false ],        // Наличие - true / Отсутствие - false бара, ресторана, магазина, отеля, завода
    businessBuyCostList: [ 0, 0, 0, 0, 0 ],                     // Цена покупки бизнеса
    businessSellCostList: [ 0, 0, 0, 0, 0 ],                    // Цена продажи бизнеса
    businessYearOutcome: [ 0, 0, 0, 0, 0],                      // Годовой доход бизнеса

    employeesList: [ false, false, false, false, false ],       // Наличие - true / Отсутствие - false маклера, врача, адвоката, детектива, личной охраны
    employeesSalaryList: [ 0, 0, 0, 0, 0 ],                     // Зарплата подчиненных

    businessIncome: [ 0, 0, 0, 0, 0 ],                          // Доход от бизнеса
    stocksQuantity: [ 0, 0, 0, 0, 0 ],                          // Количество акций каждой компании в собственности
    avgStocksCost: [ 0, 0, 0, 0, 0 ],                           // Средние цены купленных акций
    insuredPossession: [ false, false, false, false, false ],   // Застрахована - true / Не застраховано - false квартира, машина, вилла, яхта, самолет
    insuranceCost: [ 0, 0, 0, 0, 0 ],                           // Сумма, накоторую застраховано имущество
    depositAmout: 0,                                            // Сумма вклада
}

const saveState = ( state, param, payload, saveStateToStore ) => {
    state[ param ] = payload;
    if( saveStateToStore ) saveDataToStore( 'GAME_SETTINGS', state );
    return state;
}

export const gameSettingsReducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case 'SAVE_GAME_SETTINGS_INITIAL_STATE':
            saveDataToStore( 'GAME_SETTINGS', initialState );
            return initialState;
        case 'SET_YEAR':
            return saveState( state, 'year', action.payload, action.saveStateToStore );
        case 'SET_GAME_DIFFICULTY_LEVEL':
            return saveState( state, 'gameDifficultyLevel', action.payload, action.saveStateToStore );
        case 'SET_PLAYER_AGE':
            return saveState( state, 'playerAge', action.payload, action.saveStateToStore );
        case 'SET_CASH_AMOUNT':
            return saveState( state, 'cash', action.payload, action.saveStateToStore );
        case 'SET_DEATH_AGE':
            return saveState( state, 'deathAge', action.payload, action.saveStateToStore );
        case 'SET_END_OF_YEAR':
            return saveState( state, 'endOfYear', action.payload, action.saveStateToStore );
        case 'SET_POS_WITHIN_YEAR':
            return saveState( state, 'posWithinYear', action.payload, action.saveStateToStore );
        case 'SET_SOCIAL_STATUS':
            return saveState( state, 'currentSocialStatus', action.payload, action.saveStateToStore );
        case 'SET_IS_ELECTION_OVER_OR_NOT_HELD':
            return saveState( state, 'isElectionOverOrNotHeld', action.payload, action.saveStateToStore );
        case 'SET_POSSESSION_LIST':
            return saveState( state, 'possessionList', action.payload, action.saveStateToStore );
        case 'SET_POSSESSION_BUY_COST_LIST':
            return saveState( state, 'possessionBuyCostList', action.payload, action.saveStateToStore );
        case 'SET_POSSESSION_SELL_COST_LIST':
            return saveState( state, 'possessionSellCostList', action.payload, action.saveStateToStore );
        case 'SET_EMPLOYEES_LIST':
            return saveState( state, 'employeesList', action.payload, action.saveStateToStore );
        case 'SET_EMPLOYEES_SALARY_LIST':
            return saveState( state, 'employeesSalaryList', action.payload, action.saveStateToStore );
        case 'SET_BUSINESS_LIST':
            return saveState( state, 'businessList', action.payload, action.saveStateToStore );
        case 'SET_BUSINESS_BUY_COST_LIST':
            return saveState( state, 'businessBuyCostList', action.payload, action.saveStateToStore );
        case 'SET_BUSINESS_SELL_COST_LIST':
            return saveState( state, 'businessSellCostList', action.payload, action.saveStateToStore );
        case 'SET_BUSINESS_YEAR_OUTCOME':
            return saveState( state, 'businessYearOutcome', action.payload, action.saveStateToStore );
        case 'SET_STOCKS_QUANTITY_LIST':
            return saveState( state, 'stocksQuantity', action.payload, action.saveStateToStore );
        case 'SET_AVG_STOCKS_COST_LIST':
            return saveState( state, 'avgStocksCost', action.payload, action.saveStateToStore );
        case 'SET_INSURED_POSSESSION_LIST':
            return saveState( state, 'insuredPossession', action.payload, action.saveStateToStore );
        case 'SET_INSURANCE_COST_LIST':
            return saveState( state, 'insuranceCost', action.payload, action.saveStateToStore );
        case 'LOAD_GAME_SETTINGS':
            if ( action.payload ) return action.payload;
            return state;
        default:
            return state;
    }
}