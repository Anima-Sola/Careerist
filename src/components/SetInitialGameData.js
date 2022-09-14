import store from "../store";
import { 
    setIsGameStarted, 
    setDeathAge, 
    setEndOfTheYear,
    setPossessionBuyCostList,
    setPossessionSellCostList,
    setBusinessBuyCostList,
    setBusinessSellCostList,
    setBusinessYearOutcome,
    setEmployeesSalaryList
} from "../store/actions/actions";

export const setInitialGameData = () => {
    store.dispatch(setIsGameStarted( true, true ));

    const commonSettings = store.getState().gameSettingsReducer.commonSettings;

    const gameDifficultyLevel = commonSettings.gameDifficultyLevel;
    const playerAge = commonSettings.playerAge;
    const cash = commonSettings.cash;

    const deathAge = Math.round( 60 + 20 * Math.random() );
    store.dispatch(setDeathAge( deathAge ));

    const endOfTheYear = Math.round( gameDifficultyLevel + ( 5 - gameDifficultyLevel ) * Math.round() );
    store.dispatch(setEndOfTheYear( endOfTheYear ));

    const possessionBuyCostList = [];
    const possessionSellCostList = [];
    const businessBuyCostList = [];
    const businessSellCostList = [];
    const businessYearOutcome = [];
    const employeesSalaryList = [];

    for( let i = 1; i <= 5; i++ ) {
        let rndPossession = Math.random();
        possessionBuyCostList[ i - 1 ] = Math.round( 5 ** i * ( 2 + 5 * rndPossession ) * 20 );
        possessionSellCostList[ i - 1 ] = Math.round( 0.7 * possessionBuyCostList[ i - 1 ] * ( rndPossession + 0.3 ) );
        
        let rndBusiness = Math.random();
        businessBuyCostList[ i - 1 ] = Math.round( 5 ** i * ( 2 + 5 * rndBusiness ) * 20 );
        businessSellCostList[ i - 1 ] = Math.round( 0.7 * businessBuyCostList[ i - 1 ] * ( rndBusiness + 0.3 ) );
        businessYearOutcome[ i - 1 ] = Math.round( businessSellCostList[ i - 1 ] * ( rndBusiness - 0.3 ) );

        let rndEmployees = Math.random();
        employeesSalaryList[ i - 1 ] = Math.round( 4500 * rndEmployees + 2000 * i );
    }

    store.dispatch(setPossessionBuyCostList( possessionBuyCostList ));
    store.dispatch(setPossessionSellCostList( possessionSellCostList ));
    store.dispatch(setBusinessBuyCostList( businessBuyCostList ));
    store.dispatch(setBusinessSellCostList( businessSellCostList ));
    store.dispatch(setBusinessYearOutcome( businessYearOutcome ));
    store.dispatch(setEmployeesSalaryList( employeesSalaryList, true ));
}