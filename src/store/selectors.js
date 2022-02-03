//Game settings selectors
export const getGameDifficultyLevel = state => state.gameSettingsReducer.gameDifficultyLevel;
export const getCash = state => state.gameSettingsReducer.cash;

//App settings selectors
export const getIsGameStarted = state => state.appSettingsReducer.isGameStarted;