//Game settings selectors
export const getGameDifficultyLevel = state => state.gameSettingsReducer.gameDifficultyLevel;
export const getCash = state => state.gameSettingsReducer.cash;
export const getYear = state => state.gameSettingsReducer.year;
export const getCurrentSocialStatus = state => state.gameSettingsReducer.currentSocialStatus;

//App settings selectors
export const getIsGameStarted = state => state.appSettingsReducer.isGameStarted;