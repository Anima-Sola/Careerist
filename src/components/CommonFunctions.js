import store from "../store";
import random, { rndBetweenMinusOneAndOne } from "./Random";
import {
    setElectionStatus,
    setEndOfYear,  
    setPosWithinYear,
    setBorrowTermAction,
    setLendTermAction,
    setInsurancePossessionTermListAction,
    setCommonBusinessIncomeAction,
    setYearExpenseAction,
    setDepositAmountAction,
    setCashAmountAction,
    setPossessionBuyCostList,
    setPossessionSellCostList,
    setBusinessBuyCostList,
    setBusinessSellCostList,
    setBusinessYearIncome,
    setEmployeesSalaryList,
    setIsBankBankruptAction
} from "../store/actions/actions";

export const setInitialGameData = () => {
    
    const commonSettings = store.getState().gameSettingsReducer.commonSettings;
    const gameDifficultyLevel = commonSettings.gameDifficultyLevel;
    const endOfYear = gameDifficultyLevel + ( 5 - gameDifficultyLevel ) * random();
    
    store.dispatch(setEndOfYear( endOfYear ));
    store.dispatch(setElectionStatus( true ));
    store.dispatch(setPosWithinYear( 0 ));
    store.dispatch(setYearExpenseAction( 0 ));
    store.dispatch(setCommonBusinessIncomeAction( 0.2 ));
    store.dispatch(setIsBankBankruptAction( false ));

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

export const calcSubtotals = ( timeStep ) => {
    const commonSettings = store.getState().gameSettingsReducer.commonSettings;
    let { posWithinYear, endOfYear, currentSocialStatus, yearExpense } = commonSettings;

    if( endOfYear <= posWithinYear ) return;
    
    const possessionSettings = store.getState().gameSettingsReducer.possessionSettings;
    let { possessionList, possessionSellCostList } = possessionSettings;

    const businessSettings = store.getState().gameSettingsReducer.businessSettings;
    let { businessList, commonBusinessIncome, businessYearIncome } = businessSettings;

    const employeesSettings = store.getState().gameSettingsReducer.employeesSettings;
    let { employeesList, employeesSalaryList } = employeesSettings;

    const bankSettings = store.getState().gameSettingsReducer.bankSettings;
    let { depositAmount, borrowTerm, lendTerm, insurancePossessionTermList } = bankSettings;

    store.dispatch(setPosWithinYear( posWithinYear + timeStep ));

    posWithinYear = posWithinYear + timeStep;
    if( posWithinYear >= endOfYear ) timeStep = timeStep + endOfYear - posWithinYear;

    timeStep = timeStep / endOfYear;

    for( let i = 0; i < 5; i++ ) {
        insurancePossessionTermList[ i ] = insurancePossessionTermList[ i ] - timeStep;
    }

    store.dispatch(setBorrowTermAction( borrowTerm - timeStep ));
    store.dispatch(setLendTermAction( lendTerm - timeStep ));
    store.dispatch(setInsurancePossessionTermListAction( insurancePossessionTermList ));

    let subtotalYearExpense = 500 * ( 2 + currentSocialStatus ** 2 + rndBetweenMinusOneAndOne() );
    
    let subtotalBusinessIncome = 0;

    for( let i = 0; i < 5; i++ ) {
        subtotalYearExpense = subtotalYearExpense + 0.45 * possessionList[ i ] * possessionSellCostList[ i ] + employeesList[ i ] * employeesSalaryList[ i ];
        subtotalBusinessIncome = subtotalBusinessIncome + businessList[ i ] * businessYearIncome[ i ];
    }

    yearExpense = yearExpense + subtotalYearExpense * timeStep;
    commonBusinessIncome = commonBusinessIncome + subtotalBusinessIncome * timeStep;

    store.dispatch(setYearExpenseAction( yearExpense ));
    store.dispatch(setCommonBusinessIncomeAction( commonBusinessIncome ));

    depositAmount = depositAmount * Math.exp( timeStep * Math.log( 1 + 0.02 * currentSocialStatus ));
    store.dispatch(setDepositAmountAction( depositAmount ), true );
}

export const setCashAmountMinusFine = ( fineAmount ) => {
    const { cash, yearExpense } = store.getState().gameSettingsReducer.commonSettings;
    let updatedCash = cash - fineAmount;
    if( updatedCash < 0 ) {
        store.dispatch(setYearExpenseAction( yearExpense - updatedCash ));
        updatedCash = 0;
    }
    store.dispatch(setCashAmountAction( updatedCash, true ));
}

export const getFineAmount = () => {
    const value = rndBetweenMinusOneAndOne();
    return 1500 + 50 * Math.floor( 10 * value );
}

export const calcInEstateAmount = () => {
    const { businessList, businessSellCostList } = store.getState().gameSettingsReducer.businessSettings;
    const { possessionList, possessionSellCostList } = store.getState().gameSettingsReducer.possessionSettings;

    let amount = 0;
    for( let i = 0; i < 5; i++ ) {
        amount = amount + possessionList[ i ] * possessionSellCostList[ i ] + businessList[ i ] * businessSellCostList[ i ];
    }
    return amount;
}

export const calcInStocksAmount = () => {
    const { stocksCostList, stocksQuantityList } = store.getState().gameSettingsReducer.stockSettings;

    let  amount = 0;
    for( let i = 0; i < 5; i++ ) amount = amount + stocksQuantityList[ i ] * stocksCostList[ i ];
    return amount;
}

export const isEmployeesHired = () => {
    const { employeesList } = store.getState().gameSettingsReducer.employeesSettings;
    if( employeesList.indexOf( true ) !== - 1 ) return true;
    return false;
}

export const INT = ( value ) => {
    const intValue = Math.trunc( value );
    if( intValue === value ) return intValue - 1;
    return intValue;
}

export const getPrisonTerm = ( term ) => {
    let yearName = '';

    if( term === 1 ) yearName = term +' год';
    else if( ( term > 1 ) && ( term < 5 ) ) yearName = term + ' года';
    else yearName = term + ' лет';

    return yearName;
}