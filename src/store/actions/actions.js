import { getDataFromStore } from "../../components/FileSystem";

//Game settings actions
export const loadGameSettings = () => {
    return async dispatch => {
        const settings = await getDataFromStore( 'GAME_SETTINGS' );
        dispatch({
            type: 'LOAD_GAME_SETTINGS',
            payload: settings
        });
    };
}

export const setGameDifficultyLevelAction = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_GAME_DIFFICULTY_LEVEL',
        payload: item,
        settingsSection: 'commonSettings',
        saveStateToStore
    }
};

export const setPlayerAgeAction = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_PLAYER_AGE',
        payload: item,
        settingsSection: 'commonSettings',
        saveStateToStore
    }
};

export const setCashAmountAction = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_CASH_AMOUNT',
        payload: item,
        settingsSection: 'commonSettings',
        saveStateToStore
    }
};

export const setYear = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_YEAR',
        payload: item,
        settingsSection: 'commonSettings',
        saveStateToStore
    }
}

export const setSocialStatusAction = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_SOCIAL_STATUS',
        payload: item,
        settingsSection: 'commonSettings',
        saveStateToStore
    }
}

export const setElectionStatus = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_ELECTION_STATUS',
        payload: item,
        settingsSection: 'commonSettings',
        saveStateToStore
    }
}

export const setDeathAge = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_DEATH_AGE',
        payload: item,
        settingsSection: 'commonSettings',
        saveStateToStore
    }
}

export const setEndOfYear = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_END_OF_YEAR',
        payload: item,
        settingsSection: 'commonSettings',
        saveStateToStore
    }
}

export const setPosWithinYear = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_POS_WITHIN_YEAR',
        payload: item,
        settingsSection: 'commonSettings',
        saveStateToStore
    }
}

export const setYearsPassedAction = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_YEARS_PASSED',
        payload: item,
        settingsSection: 'commonSettings',
        saveStateToStore
    }
}

export const setYearExpenseAction = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_YEAR_EXPENSE',
        payload: item,
        settingsSection: 'commonSettings',
        saveStateToStore
    }
}

export const setPrisonTermAction = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_PRISON_TERM',
        payload: item,
        settingsSection: 'commonSettings',
        saveStateToStore
    }
}

//---------------------------------------------------------------------------------------
export const setPossessionListAction = ( list, saveStateToStore = false ) => {
    return {
        type: 'SET_POSSESSION_LIST',
        payload: list,
        settingsSection: 'possessionSettings',
        saveStateToStore
    }
}

export const setPossessionBuyCostList = ( list, saveStateToStore = false) => {
    return {
        type: 'SET_POSSESSION_BUY_COST_LIST',
        payload: list,
        settingsSection: 'possessionSettings',
        saveStateToStore
    }
}

export const setPossessionSellCostList = ( list, saveStateToStore = false) => {
    return {
        type: 'SET_POSSESSION_SELL_COST_LIST',
        payload: list,
        settingsSection: 'possessionSettings',
        saveStateToStore
    }
}

//---------------------------------------------------------------------------------------
export const setEmployeesList = ( list, saveStateToStore = false ) => {
    return {
        type: 'SET_EMPLOYEES_LIST',
        payload: list,
        settingsSection: 'employeesSettings',
        saveStateToStore
    }
}

export const setEmployeesSalaryList = ( list, saveStateToStore = false ) => {
    return {
        type: 'SET_EMPLOYEES_SALARY_LIST',
        payload: list,
        settingsSection: 'employeesSettings',
        saveStateToStore
    }
}

export const setCommonBusinessIncomeAction = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_COMMON_BUSINESS_INCOME',
        payload: item,
        settingsSection: 'businessSettings',
        saveStateToStore
    }
}

//---------------------------------------------------------------------------------------
export const setBusinessListAction = ( list, saveStateToStore = false ) => {
    return {
        type: 'SET_BUSINESS_LIST',
        payload: list,
        settingsSection: 'businessSettings',
        saveStateToStore
    }
}

export const setBusinessBuyCostList = ( list, saveStateToStore = false ) => {
    return {
        type: 'SET_BUSINESS_BUY_COST_LIST',
        payload: list,
        settingsSection: 'businessSettings',
        saveStateToStore
    }
}

export const setBusinessSellCostList = ( list, saveStateToStore = false ) => {
    return {
        type: 'SET_BUSINESS_SELL_COST_LIST',
        payload: list,
        settingsSection: 'businessSettings',
        saveStateToStore
    }
}

export const setBusinessYearIncome = ( list, saveStateToStore = false ) => {
    return {
        type: 'SET_BUSINESS_YEAR_INCOME',
        payload: list,
        settingsSection: 'businessSettings',
        saveStateToStore
    }
}

//---------------------------------------------------------------------------------------
export const setStocksQuantityListAction = ( list, saveStateToStore = false ) => {
    return {
        type: 'SET_STOCKS_QUANTITY_LIST',
        payload: list,
        settingsSection: 'stockSettings',
        saveStateToStore
    }
}

export const setStocksCostListAction = ( list, saveStateToStore = false ) => {
    return {
        type: 'SET_STOCKS_COST_LIST',
        payload: list,
        settingsSection: 'stockSettings',
        saveStateToStore
    }
}

export const setDividendsListAction = ( list, saveStateToStore = false ) => {
    return {
        type: 'SET_DIVIDENDS_LIST',
        payload: list,
        settingsSection: 'stockSettings',
        saveStateToStore
    }
}

//---------------------------------------------------------------------------------------
export const setIsBankBankruptAction = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_IS_BANK_BANKRUPT',
        payload: item,
        settingsSection: 'bankSettings',
        saveStateToStore
    }
}


export const setDepositAmountAction = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_DEPOSIT_AMOUNT',
        payload: item,
        settingsSection: 'bankSettings',
        saveStateToStore
    }
}

export const setLendAmountAction = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_LEND_AMOUNT',
        payload: item,
        settingsSection: 'bankSettings',
        saveStateToStore
    }
}

export const setLendTermAction = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_LEND_TERM',
        payload: item,
        settingsSection: 'bankSettings',
        saveStateToStore
    }
}

export const setLendPersentagesAction = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_LEND_PERSENTAGES',
        payload: item,
        settingsSection: 'bankSettings',
        saveStateToStore
    }
}

export const setBorrowAmountAction = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_BORROW_AMOUNT',
        payload: item,
        settingsSection: 'bankSettings',
        saveStateToStore
    }
}

export const setBorrowTermAction = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_BORROW_TERM',
        payload: item,
        settingsSection: 'bankSettings',
        saveStateToStore
    }
}

export const setBorrowPersentagesAction = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_BORROW_PERSENTAGES',
        payload: item,
        settingsSection: 'bankSettings',
        saveStateToStore
    }
}

export const setInsuredPossessionListAction = ( list, saveStateToStore = false ) => {
    return {
        type: 'SET_INSURED_POSSESSION_LIST',
        payload: list,
        settingsSection: 'bankSettings',
        saveStateToStore
    }
}

export const setInsurancePossessionCostListAction = ( list, saveStateToStore = false ) => {
    return {
        type: 'SET_INSURANCE_POSSESSION_COST_LIST',
        payload: list,
        settingsSection: 'bankSettings',
        saveStateToStore
    }
}

export const setInsurancePossessionTermListAction = ( list, saveStateToStore = false ) => {
    return {
        type: 'SET_INSURANCE_POSSESSION_TERM_LIST',
        payload: list,
        settingsSection: 'bankSettings',
        saveStateToStore
    }
}

//---------------------------------------------------------------------------------------
export const saveGameSettingsInitialState = () => {
    return {
        type: 'SAVE_GAME_SETTINGS_INITIAL_STATE'
    }
}


//App settings actions
export const loadAppSettings = () => {
    return async dispatch => {
        const settings = await getDataFromStore( 'APP_SETTINGS' );
        dispatch({
            type: 'LOAD_APP_SETTINGS',
            payload: settings
        });
    };
}

export const setIsGameStarted = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_IS_GAME_STARTED',
        payload: item,
        saveStateToStore
    }
};

export const saveAppSettingsInitialState = () => {
    return {
        type: 'SAVE_APP_SETTINGS_INITIAL_STATE'
    }
}
