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
        saveStateToStore
    }
};

export const setPlayerAgeAction = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_PLAYER_AGE',
        payload: item,
        saveStateToStore
    }
};

export const setCashAmountAction = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_CASH_AMOUNT',
        payload: item,
        saveStateToStore
    }
};

export const setYear = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_YEAR',
        payload: item,
        saveStateToStore
    }
}

export const setSocialStatus = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_SOCIAL_STATUS',
        payload: item,
        saveStateToStore
    }
}

export const setIsElectionOverOrNotHeld = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_IS_ELECTION_OVER_OR_NOT_HELD',
        payload: item,
        saveStateToStore
    }
}


export const saveGameSettingsInitialState = () => {
    return {
        type: 'SAVE_GAME_SETTINGS_INITIAL_STATE'
    }
}

export const setPossessionList = ( list, saveStateToStore = false ) => {
    return {
        type: 'SET_POSSESSION_LIST',
        payload: list,
        saveStateToStore
    }
}

export const setPossessionBuyCostList = ( list, saveStateToStore = false) => {
    return {
        type: 'SET_POSSESSION_BUY_COST_LIST',
        payload: list,
        saveStateToStore
    }
}

export const setPossessionSellCostList = ( list, saveStateToStore = false) => {
    return {
        type: 'SET_POSSESSION_SELL_COST_LIST',
        payload: list,
        saveStateToStore
    }
}

export const setEmployeesList = ( list, saveStateToStore = false ) => {
    return {
        type: 'SET_EMPLOYEES_LIST',
        payload: list,
        saveStateToStore
    }
}

export const setEmployeesSalaryList = ( list, saveStateToStore = false ) => {
    return {
        type: 'SET_EMPLOYEES_SALARY_LIST',
        payload: list,
        saveStateToStore
    }
}

export const setBusinessList = ( list, saveStateToStore = false ) => {
    return {
        type: 'SET_BUSINESS_LIST',
        payload: list,
        saveStateToStore
    }
}

export const setBusinessCostList = ( list, saveStateToStore = false ) => {
    return {
        type: 'SET_BUSINESS_COST_LIST',
        payload: list,
        saveStateToStore
    }
}

export const setStocksQuantityList = ( list, saveStateToStore = false ) => {
    return {
        type: 'SET_STOCKS_QUANTITY_LIST',
        payload: list,
        saveStateToStore
    }
}

export const setAvgStocksCostList = ( list, saveStateToStore = false ) => {
    return {
        type: 'SET_AVG_STOCKS_COST_LIST',
        payload: list,
        saveStateToStore
    }
}

export const setInsuredPossessionList = ( list, saveStateToStore = false ) => {
    return {
        type: 'SET_INSURED_POSSESSION_LIST',
        payload: list,
        saveStateToStore
    }
}

export const setInsuranceCostList = ( list, saveStateToStore = false ) => {
    return {
        type: 'SET_INSURANCE_COST_LIST',
        payload: list,
        saveStateToStore
    }
}

export const setDeathAge = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_DEATH_AGE',
        payload: item,
        saveStateToStore
    }
}

export const setEndOfTheYear = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_END_OF_YEAR',
        payload: item,
        saveStateToStore
    }
}

export const setPosWithinYear = ( item, saveStateToStore = false ) => {
    return {
        type: 'SET_POS_WITHIN_YEAR',
        payload: item,
        saveStateToStore
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
