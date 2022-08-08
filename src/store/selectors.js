//Game settings selectors
export const getGameDifficultyLevel = state => state.gameSettingsReducer.gameDifficultyLevel;
export const getCash = state => state.gameSettingsReducer.cash;
export const getPlayerAge = state => state.gameSettingsReducer.playerAge;
export const getYear = state => state.gameSettingsReducer.year;
export const getDeathAge = state => state.gameSettingsReducer.deathAge;
export const getEndOfYear = state => state.gameSettingsReducer.getEndOfYear;
export const getPosWithinYear = state => state.gameSettingsReducer.posWithinYear;
export const getCurrentSocialStatus = state => state.gameSettingsReducer.currentSocialStatus;
export const getIsElectionOverOrNotHeld = state => state.gameSettingsReducer.isElectionOverOrNotHeld;

export const getPossessionList = state => state.gameSettingsReducer.possessionList;
export const getPossessionBuyCostList = state => state.gameSettingsReducer.possessionBuyCostList;
export const getPossessionSellCostList = state => state.gameSettingsReducer.possessionSellCostList;

export const getEmployeesList = state => state.gameSettingsReducer.employeesList;
export const getEmployeesSalaryList = state => state.gameSettingsReducer.employeesSalaryList;

export const getBusinessList = state => state.gameSettingsReducer.businessList;
export const getBusinessBuyCostList = state => state.gameSettingsReducer.businessBuyCostList;
export const getBusinessSellCostList = state => state.gameSettingsReducer.businessSellCostList;
export const getBusinessYearOutcome = state => state.gameSettingsReducer.businessYearOutcome;

export const getStocksQuantityList = state => state.gameSettingsReducer.stocksQuantity;
export const getAvgStocksCostList = state => state.gameSettingsReducer.avgStocksCost;
export const getInsuredPossessionList = state => state.gameSettingsReducer.insuredPossession;
export const getInsuranceCostList = state => state.gameSettingsReducer.insuranceCost;

//App settings selectors
export const getIsGameStarted = state => state.appSettingsReducer.isGameStarted;