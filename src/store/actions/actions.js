export const setGameDifficultyLevelAction = ( item ) => {
    return {
        type: 'SET_GAME_DIFFICULTY_LEVEL',
        payload: item
    }
    /*return ( dispatch ) => {
        dispatch({
            type: 'SET_GAME_DIFFICULTY_LEVEL',
            payload: item
        });
    };*/
};

export const setPlayerAgeAction = ( item ) => {
    return ( dispatch ) => {
        dispatch({
            type: 'SET_PLAYER_AGE',
            payload: item
        });
    };
};

export const setCashAmountAction = ( item ) => {
    return ( dispatch ) => {
        dispatch({
            type: 'SET_CASH_AMOUNT',
            payload: item
        });
    };
};