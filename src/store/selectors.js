//Game settings selectors
export const getGameDifficultyLevel = state => state.gameSettingsReducer.gameDifficultyLevel;
export const getCash = state => state.gameSettingsReducer.cash;
export const getPlayerAge = state => state.gameSettingsReducer.playerAge;
export const getYear = state => state.gameSettingsReducer.year;
export const getCurrentSocialStatus = state => state.gameSettingsReducer.currentSocialStatus;
export const getIsElectionOverOrNotHeld = state => state.gameSettingsReducer.isElectionOverOrNotHeld;
export const getPossessionList = state => state.gameSettingsReducer.possession;
export const getPossessionCostList = state => state.gameSettingsReducer.possessionCost;
export const getEmployeesList = state => state.gameSettingsReducer.employees;
export const getEmployeesSalaryList = state => state.gameSettingsReducer.employeesSalary;
export const getBusinessList = state => state.gameSettingsReducer.business;
export const getBusinessCostList = state => state.gameSettingsReducer.businessCost;
export const getStocksQuantityList = state => state.gameSettingsReducer.stocksQuantity;
export const getAvgStocksCostList = state => state.gameSettingsReducer.avgStocksCost;
export const getInsuredPossessionList = state => state.gameSettingsReducer.insuredPossession;
export const getInsuranceCostList = state => state.gameSettingsReducer.insuranceCost;

//App settings selectors
export const getIsGameStarted = state => state.appSettingsReducer.isGameStarted;