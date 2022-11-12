import { saveDataToStore } from '../../components/FileSystem';

const initialState = {

    commonSettings: {
        gameDifficultyLevel: 3,                                 // Уровень сложности
        playerAge: 18,                                          // Возраст игрока
        deathAge: 120,                                          // Дата смерти игрока
        year: new Date().getFullYear(),                         // Стартовый год
        posWithinYear: 0,                                       // Позиция внутри года
        endOfYear: 10,                                          // Маркер конца года
        yearsPassed: 0,                                         // Сколько прошло лет с момента начала игры  
        
        cash: 1500,                                             // Сумма налички
        yearExpense: 0,                                         // Годовые расходы

        currentSocialStatus: 1,                                 // 1 - Бизнесмен, 2 - лидер профсоюза мусорщиков, 3 - шериф, 4 - сенатор, 5 - президент
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
        commonBusinessIncome: 0,                                // Доход от бизнеса
        businessList: [ false, false, false, false, false ],    // Наличие - true / Отсутствие - false бара, ресторана, магазина, отеля, завода
        businessBuyCostList: [ 0, 0, 0, 0, 0 ],                 // Цена покупки бизнеса
        businessSellCostList: [ 0, 0, 0, 0, 0 ],                // Цена продажи бизнеса
        businessYearIncome: [ 0, 0, 0, 0, 0],                   // Годовой доход бизнеса
    },

    employeesSettings: {
        employeesList: [ false, false, false, false, false ],   // Наличие - true / Отсутствие - false маклера, врача, адвоката, детектива, личной охраны
        employeesSalaryList: [ 0, 0, 0, 0, 0 ],                 // Зарплата подчиненных
    },

    stockSettings: {
        dividendsIncome: 0,                                     // Доход от дивидендов
        stocksQuantityList: [ 0, 0, 0, 0, 0 ],                  // Количество акций каждой компании в собственности
        stocksCostList: [ 0, 0, 0, 0, 0 ],                      // Цены купленных акций
        dividendsList: [ 0, 0, 0, 0, 0]                         // Дивиденды
    },
    
    bankSettings: {
        isBankBankrupt: false,                                          // Бакрот банк или нет false - нет, true - да
        depositAmount: 0,                                               // Сумма вклада
        lendAmount: 0,                                                  // Сумма отданной ссуды
        lendTerm: 0,                                                    // Срок отданной ссуды
        borrowAmount: 0,                                                // Сумма полученного кредита
        borrowTerm: 0,                                                  // Срок полученного кредита
        insuredPossessionList: [ false, false, false, false, false ],   // Застрахованное имущество. true - затраховано, false - нет
        insurancePossessionCostList: [ 0, 0, 0, 0, 0 ],                 // Стоимость страховки
        insurancePossessionTermList: [ 0, 0, 0, 0, 0 ]                  // Стоимость страховки
    },

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
        case 'SET_YEARS_PASSED':
            return saveState( state, 'yearsPassed', action );
        case 'SET_YEAR_EXPENSE':
            return saveState( state, 'yearExpense', action );

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
        case 'SET_BUSINESS_YEAR_INCOME':
            return saveState( state, 'businessYearIncome', action );
        case 'SET_COMMON_BUSINESS_INCOME':
            return saveState( state, 'commonBusinessIncome', action );

        case 'SET_STOCKS_QUANTITY_LIST':
            return saveState( state, 'stocksQuantityList', action );
        case 'SET_STOCKS_COST_LIST':
            return saveState( state, 'stocksCostList', action );
        case 'SET_DIVIDENDS_LIST':
            return saveState( state, 'dividendsList', action );
        case 'SET_DIVIDENDS_INCOME':
            return saveState( state, 'dividendsIncome', action );
   
        case 'SET_IS_BANK_BANKRUPT':
            return saveState( state, 'isBankBankrupt', action);
        case 'SET_DEPOSIT_AMOUNT':
            return saveState( state, 'depositAmount', action);
        case 'SET_LEND_AMOUNT':
            return saveState( state, 'lendAmount', action);
        case 'SET_LEND_TERM':
            return saveState( state, 'lendTerm', action);
        case 'SET_BORROW_AMOUNT':
            return saveState( state, 'borrowAmount', action);
        case 'SET_BORROW_TERM':
            return saveState( state, 'borrowTerm', action);
        case 'SET_INSURED_POSSESSION_LIST':
            return saveState( state, 'insuredPossessionList', action );
        case 'SET_INSURANCE_POSSESSION_COST_LIST':
            return saveState( state, 'insurancePossessionCostList', action );
        case 'SET_INSURANCE_POSSESSION_TERM_LIST':
            return saveState( state, 'insurancePossessionTermList', action );

        case 'LOAD_GAME_SETTINGS':
            if ( action.payload ) return action.payload;
            return state;
        default:
            return state;
    }
}