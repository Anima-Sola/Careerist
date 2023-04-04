//Game settings selectors
export const getCommonSettings = state => state.gameSettingsReducer.commonSettings;
export const getPossessionSettings = state => state.gameSettingsReducer.possessionSettings;
export const getBusinessSettings = state => state.gameSettingsReducer.businessSettings;
export const getEmployeesSettings = state => state.gameSettingsReducer.employeesSettings;
export const getStockSettings = state => state.gameSettingsReducer.stockSettings;
export const getBankSettings = state => state.gameSettingsReducer.bankSettings;

//App settings selectors
export const getSoundSettings = state => state.appSettingsReducer.soundSettings;