import store from "../store";
import { 
    setIsGameStarted, 
    setEndOfYear,
    setPossessionBuyCostList,
    setPossessionSellCostList,
    setBusinessBuyCostList,
    setBusinessSellCostList,
    setBusinessYearIncome,
    setEmployeesSalaryList
} from "../store/actions/actions";
import random from "./Random";

export const setInitialGameData = () => {
    store.dispatch(setIsGameStarted( true, true ));

    const commonSettings = store.getState().gameSettingsReducer.commonSettings;

    const gameDifficultyLevel = commonSettings.gameDifficultyLevel;

    const endOfYear = gameDifficultyLevel + ( 5 - gameDifficultyLevel ) * random();
    store.dispatch(setEndOfYear( endOfYear ));

    const possessionBuyCostList = [];
    const possessionSellCostList = [];
    const businessBuyCostList = [];
    const businessSellCostList = [];
    const businessYearIncome = [];
    const employeesSalaryList = [];

    let rnd;

    for( let i = 1; i <= 5; i++ ) {
        rnd = random();
        possessionBuyCostList[ i - 1 ] = Math.floor( ( 2 + 5 * rnd ) * 20 * 5 ** i );
        possessionSellCostList[ i - 1 ] = Math.floor( 0.7 * possessionBuyCostList[ i - 1 ] * ( rnd + 0.3 ) );
    }
            
    for( let i = 1; i <= 5; i++ ) {
        rnd = random();
        businessBuyCostList[ i - 1 ] = Math.floor( 5 ** i * ( 2 + 5 * rnd ) * 20 );
        businessSellCostList[ i - 1 ] = Math.floor( 0.7 * businessBuyCostList[ i - 1 ] * ( rnd + 0.3 ) );
        businessYearIncome[ i - 1 ] = Math.floor( businessSellCostList[ i - 1 ] * ( rnd - 0.3 ) );
    }

    for( let i = 1; i <= 5; i++ ) {
        rnd = random();
        employeesSalaryList[ i - 1 ] = Math.floor( 4500 * rnd + 2000 * i );
    }

    store.dispatch(setPossessionBuyCostList( possessionBuyCostList ));
    store.dispatch(setPossessionSellCostList( possessionSellCostList ));
    store.dispatch(setBusinessBuyCostList( businessBuyCostList ));
    store.dispatch(setBusinessSellCostList( businessSellCostList ));
    store.dispatch(setBusinessYearIncome( businessYearIncome ));
    store.dispatch(setEmployeesSalaryList( employeesSalaryList, true ));
}