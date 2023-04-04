import { saveDataToStore } from '../../components/FileSystem';

const initialState = {

    commonSettings: {
        isNewYearBegun: false,                                          // New year start flag
        gameDifficultyLevel: 3,                                         // Difficulty level
        playerAge: 18,                                                  // Player age
        deathAge: 120,                                                  // Death age
        year: new Date().getFullYear(),                                 // Start year
        posWithinYear: 0,                                               // Position within the current year
        endOfYear: 10,                                                  // Year-end marker
        yearsPassed: 0,                                                 // How many years has it been since the game began 
        cash: 1500,                                                     // Cash amount
        yearExpense: 0,                                                 // Annual expense
        currentSocialStatus: 1,                                         // 1 - Businessman, 2 - Trashman union leader, 3 - Sheriff, 4 - Senator, 5 - President
        electionStatus: true,                                           // Flag, true - there is an election, false - no election
        prisonTerm: 0                                                   // Term as far as imprisonment for debts
    },

    possessionSettings: {
        possessionList: [ false, false, false, false, false ],          // Existence - true / Absence - false apartment, car, villa, yacht, plane
        possessionBuyCostList: [ 0, 0, 0, 0, 0 ],                       // The purchase price of the possession
        possessionSellCostList: [ 0, 0, 0, 0, 0 ],                      // Selling price of the possession
    },

    businessSettings: {
        commonBusinessIncome: 0.2,                                      // Business income
        businessList: [ false, false, false, false, false ],            // Presence - true / Absence - false bar, restaurant, store, hotel, factory
        businessBuyCostList: [ 0, 0, 0, 0, 0 ],                         // The price of buying a business
        businessSellCostList: [ 0, 0, 0, 0, 0 ],                        // Selling price of the business
        businessYearIncome: [ 0, 0, 0, 0, 0],                           // Annual business income
    },

    employeesSettings: {
        employeesList: [ false, false, false, false, false ],           // Presence - true / Absence - false broker, doctor, lawyer, detective, personal security
        employeesSalaryList: [ 0, 0, 0, 0, 0 ],                         // Salaries of employees
    },

    stockSettings: {
        stocksQuantityList: [ 0, 0, 0, 0, 0 ],                          // Number of shares of each company owned
        stocksCostList: [ 0, 0, 0, 0, 0 ],                              // The prices of purchased shares
        dividendsList: [ 0, 0, 0, 0, 0]                                 // Dividends
    },
    
    bankSettings: {
        isBankBankrupt: false,                                          // Bakroth bank or not false - no, true - yes
        depositAmount: 0,                                               // Deposit amount
        lendAmount: 0,                                                  // The amount given in debt
        lendTerm: 0,                                                    // The term given in debt
        lendPersentages: 0,                                             // Interest on the amount borrowed
        borrowAmount: 0,                                                // The amount of credit received
        borrowTerm: 0,                                                  // The term of credit received
        borrowPersentages: 0,                                           // Percentage at which the credit is taken
        insuredPossessionList: [ false, false, false, false, false ],   // Insured property. true - insured, false - not insured
        insurancePossessionCostList: [ 0, 0, 0, 0, 0 ],                 // The cost of insurance
        insurancePossessionTermList: [ 0, 0, 0, 0, 0 ]                  // The term of insurance
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
        case 'SET_IS_NEW_YEAR_BEGUN':
            return saveState( state, 'isNewYearBegun', action );
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
        case 'SET_PRISON_TERM':
            return saveState( state, 'prisonTerm', action );

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
   
        case 'SET_IS_BANK_BANKRUPT':
            return saveState( state, 'isBankBankrupt', action);
        case 'SET_DEPOSIT_AMOUNT':
            return saveState( state, 'depositAmount', action);
        case 'SET_LEND_AMOUNT':
            return saveState( state, 'lendAmount', action);
        case 'SET_LEND_TERM':
            return saveState( state, 'lendTerm', action);
        case 'SET_LEND_PERSENTAGES':
            return saveState( state, 'lendPersentages', action);
        case 'SET_BORROW_AMOUNT':
            return saveState( state, 'borrowAmount', action);
        case 'SET_BORROW_TERM':
            return saveState( state, 'borrowTerm', action);
        case 'SET_BORROW_PERSENTAGES':
            return saveState( state, 'borrowPersentages', action);
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