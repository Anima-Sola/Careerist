const initialState = {
    gameSettings: {
        gameDifficultyLevel: 3,
        playerAge: 18,
    }
}

export const gameSettingsReducer = ( state = initialState, action ) => {
    let upgradedSettings = state.gameSettings;
    switch( action.type ) {
        case 'SET_GAME_DIFFICULTY_LEVEL':
            upgradedSettings.gameDifficultyLevel = action.payload
            return {
                ...state,
                upgradedSettings
            }
        case 'SET_PLAYER_AGE':
            upgradedSettings.playerAge = action.payload;
            return {
                ...state,
                upgradedSettings
            }
        default:
            return state;
    }
}