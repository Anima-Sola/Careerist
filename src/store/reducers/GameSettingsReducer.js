const initialState = {
    gameSettings: {
        gameDifficultyLevel: 3,
        playerAge: 18,
    }
}

export const gameSettingsReducer = ( state = initialState, action ) => {
    console.log(action);
    switch( action.type ) {
        case 'SET_GAME_DIFFICULTY_LEVEL':
            return state;
        case 'SET_PLAYER_AGE':
            return state;
        default:
            return state;
    }
}