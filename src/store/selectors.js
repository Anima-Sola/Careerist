//Game settings selectors
export const getGameDifficultyLevel = state => state.gameSettingsReducer.gameDifficultyLevel;
export const getCash = state => state.gameSettingsReducer.cash;
export const getPlayerAge = state => state.gameSettingsReducer.playerAge;
export const getYear = state => state.gameSettingsReducer.year;
export const getCurrentSocialStatus = state => state.gameSettingsReducer.currentSocialStatus;
export const getIsElectionOverOrNotHeld = state => state.gameSettingsReducer.isElectionOverOrNotHeld;
export const getPossessionList = state => state.gameSettingsReducer.possession;
export const getPossessionCostList = state => state.gameSettingsReducer.possessionCost;

//App settings selectors
export const getIsGameStarted = state => state.appSettingsReducer.isGameStarted;