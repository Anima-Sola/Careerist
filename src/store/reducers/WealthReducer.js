const initialState = {
    wealth: {
        cash: 1500
    }
}

export const wealthReducer = ( state = initialState, action ) => {
    console.log(action);
    switch( action.type ) {
        case 'SET_CASH_AMOUNT':
            return state;
        default:
            return state;
    }
}