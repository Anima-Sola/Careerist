const initialState = {
    wealth: {
        cash: 1500
    }
}

export const wealthReducer = ( state = initialState, action ) => {
    let upgradedWealth = state.wealth;
    switch( action.type ) {
        case 'SET_CASH_AMOUNT':
            upgradedWealth.cash = action.payload;
            return {
                ...state,
                upgradedWealth
            }
        default:
            return state;
    }
}