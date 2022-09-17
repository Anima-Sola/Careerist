import { saveDataToStore } from '../../components/FileSystem';

const initialState = {

    commonSettings: {
        gameDifficultyLevel: 3,                                 // Уровень сложности
        playerAge: 18,                                          // Возраст игрока
        deathAge: 120,                                          // Дата смерти игрока
        year: new Date().getFullYear(),                         // Стартовый год
        posWithinYear: 0,                                       // Позиция внутри года
        endOfYear: 10,                                          // Маркер конца года
        
        cash: 1500,                                             // Сумма налички

        currentSocialStatus: 0,                                 // 0 - Бизнесмен, 1 - лидер профсоюза мусорщиков, 2 - шериф, 3 - сенатор, 4 - президент
        electionStatus: true,                                   // Флаг, true - есть выборы, false - нет выборов
    },

    possessionSettings: {
        possessionList: [ false, false, false, false, false ],        // Наличие - true / Отсутствие - false квартиры, машины, виллы, яхты, самолета
        possessionBuyCostList: [ 0, 0, 0, 0, 0 ],                     // Цена покупки имущества
        possessionSellCostList: [ 0, 0, 0, 0, 0 ],                    // Цена продажи имущества
        insuredPossessionList: [ false, false, false, false, false ], // Застрахована - true / Не застраховано - false квартира, машина, вилла, яхта, самолет
        insurancePossessionCostList: [ 0, 0, 0, 0, 0 ],               // Сумма, накоторую застраховано имущество
    },

    businessSettings: {
        businessList: [ false, false, false, false, false ],    // Наличие - true / Отсутствие - false бара, ресторана, магазина, отеля, завода
        businessBuyCostList: [ 0, 0, 0, 0, 0 ],                 // Цена покупки бизнеса
        businessSellCostList: [ 0, 0, 0, 0, 0 ],                // Цена продажи бизнеса
        businessYearOutcome: [ 0, 0, 0, 0, 0],                  // Годовой доход бизнеса
    },

    employeesSettings: {
        employeesList: [ false, false, false, false, false ],   // Наличие - true / Отсутствие - false маклера, врача, адвоката, детектива, личной охраны
        employeesSalaryList: [ 0, 0, 0, 0, 0 ],                 // Зарплата подчиненных
    },

    businessIncome: [ 0, 0, 0, 0, 0 ],                          // Доход от бизнеса
    stocksQuantity: [ 0, 0, 0, 0, 0 ],                          // Количество акций каждой компании в собственности
    avgStocksCost: [ 0, 0, 0, 0, 0 ],                           // Средние цены купленных акций
    depositAmount: 0,                                           // Сумма вклада
}

const saveState = ( state, param, action ) => {
    const { payload, settingsSection, saveStateToStore } = action;
    const newState = { ...state };
    newState[ settingsSection ][ param ] = payload;
    if( saveStateToStore ) saveDataToStore( 'GAME_SETTINGS', newState );
    return newState;
}

export const gameSettingsReducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case 'SAVE_GAME_SETTINGS_INITIAL_STATE':
            saveDataToStore( 'GAME_SETTINGS', initialState );
            return initialState;
        case 'SET_YEAR':
            return saveState( state, 'year', action );
        case 'SET_GAME_DIFFICULTY_LEVEL':
            return saveState( state, 'gameDifficultyLevel', action );
        case 'SET_PLAYER_AGE':
            return saveState( state, 'playerAge', action );
        case 'SET_CASH_AMOUNT':
            return saveState( state, 'cash', action );
        case 'SET_DEATH_AGE':
            return saveState( state, 'deathAge', action );
        case 'SET_END_OF_YEAR':
            return saveState( state, 'endOfYear', action );
        case 'SET_POS_WITHIN_YEAR':
            return saveState( state, 'posWithinYear', action );
        case 'SET_SOCIAL_STATUS':
            return saveState( state, 'currentSocialStatus', action );
        case 'SET_ELECTION_STATUS':
            return saveState( state, 'electionStatus', action );
        case 'SET_POSSESSION_LIST':
            return saveState( state, 'possessionList', action );
        case 'SET_POSSESSION_BUY_COST_LIST':
            return saveState( state, 'possessionBuyCostList', action );
        case 'SET_POSSESSION_SELL_COST_LIST':
            return saveState( state, 'possessionSellCostList', action );
        case 'SET_EMPLOYEES_LIST':
            return saveState( state, 'employeesList', action );
        case 'SET_EMPLOYEES_SALARY_LIST':
            return saveState( state, 'employeesSalaryList', action );
        case 'SET_BUSINESS_LIST':
            return saveState( state, 'businessList', action );
        case 'SET_BUSINESS_BUY_COST_LIST':
            return saveState( state, 'businessBuyCostList', action );
        case 'SET_BUSINESS_SELL_COST_LIST':
            return saveState( state, 'businessSellCostList', action );
        case 'SET_BUSINESS_YEAR_OUTCOME':
            return saveState( state, 'businessYearOutcome', action );
        case 'SET_STOCKS_QUANTITY_LIST':
            return saveState( state, 'stocksQuantity', action );
        case 'SET_AVG_STOCKS_COST_LIST':
            return saveState( state, 'avgStocksCost', action );
        case 'SET_INSURED_POSSESSION_LIST':
            return saveState( state, 'insuredPossessionList', action );
        case 'SET_INSURANCE_POSSESSION_COST_LIST':
            return saveState( state, 'insurancePossessionCostList', action );
        case 'LOAD_GAME_SETTINGS':
            if ( action.payload ) return action.payload;
            return state;
        default:
            return state;
    }
}