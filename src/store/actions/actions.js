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