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

export const setGameDifficultyLevelAction = ( item ) => {
    return {
        type: 'SET_GAME_DIFFICULTY_LEVEL',
        payload: item
    }
};

export const setPlayerAgeAction = ( item ) => {
    return {
        type: 'SET_PLAYER_AGE',
        payload: item
    }
};

export const setCashAmountAction = ( item ) => {
    return {
        type: 'SET_CASH_AMOUNT',
        payload: item
    }
};

export const setYear = ( item ) => {
    return {
        type: 'SET_YEAR',
        payload: item
    }
}

export const setSocialStatus = ( item ) => {
    return {
        type: 'SET_SOCIAL_STATUS',
        payload: item
    }
}

export const setIsElectionOverOrNotHeld = ( item ) => {
    return {
        type: 'SET_IS_ELECTION_OVER_OR_NOT_HELD',
        payload: item
    }
}


export const saveGameSettingsInitialState = () => {
    return {
        type: 'SAVE_GAME_SETTINGS_INITIAL_STATE'
    }
}

export const setPossessionList = ( list ) => {
    return {
        type: 'SET_POSSESSION_LIST',
        payload: list
    }
}

export const setPossessionCostList = ( list ) => {
    return {
        type: 'SET_POSSESSION_COST_LIST',
        payload: list
    }
}

export const setEmployeesList = ( list ) => {
    return {
        type: 'SET_EMPLOYEES_LIST',
        payload: list
    }
}

export const setEmployeesSalaryList = ( list ) => {
    return {
        type: 'SET_EMPLOYEES_SALARY_LIST',
        payload: list
    }
}

export const setBusinessList = ( list ) => {
    return {
        type: 'SET_BUSINESS_LIST',
        payload: list
    }
}

export const setBusinessCostList = ( list ) => {
    return {
        type: 'SET_BUSINESS_COST_LIST',
        payload: list
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

export const setIsGameStarted = ( item ) => {
    return {
        type: 'SET_IS_GAME_STARTED',
        payload: item
    }
};

export const saveAppSettingsInitialState = () => {
    return {
        type: 'SAVE_APP_SETTINGS_INITIAL_STATE'
    }
}
