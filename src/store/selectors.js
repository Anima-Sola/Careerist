//Game settings selectors
export const getGameDifficultyLevel = state => state.gameSettingsReducer.gameDifficultyLevel;
export const getCash = state => state.gameSettingsReducer.cash;

//App settings selectors
export const getIsIntroShown = state => state.appSettingsReducer.isIntroShown;
export const getIsGameStarted = state => state.appSettingsReducer.isGameStarted;