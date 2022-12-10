import store from "../store";
import { rndBetweenMinusOneAndOne } from "./Random";
import { 
    setPosWithinYear,
    setBorrowTermAction,
    setLendTermAction,
    setInsurancePossessionTermListAction,
    setCommonBusinessIncomeAction,
    setYearExpenseAction,
    setDepositAmountAction
} from "../store/actions/actions";

const calcSubtotals = ( timeStep ) => {
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

export default calcSubtotals;

