import store from "../store";
import { 
    setIsGameStarted, 
    setDeathAge, 
    setEndOfTheYear,
    setPossessionBuyCostList,
    setPossessionSellCostList
} from "../store/actions/actions";

export const setInitialGameData = () => {
    store.dispatch(setIsGameStarted( true, true ));

    const gameSettings = store.getState().gameSettingsReducer;

    const gameDifficultyLevel = gameSettings.gameDifficultyLevel;
    const playerAge = gameSettings.playerAge;
    const cash = gameSettings.cash;

    const deathAge = Math.round( 60 + 20 * Math.random() );
    store.dispatch(setDeathAge( deathAge ));

    const endOfTheYear = Math.round( gameDifficultyLevel + ( 5 - gameDifficultyLevel ) * Math.round() );
    store.dispatch(setEndOfTheYear( endOfTheYear ));

    const possessionBuyCostList = [];
    const possessionSellCostList = [];
    const rnd = Math.random();

    for( let i = 0; i < 5; i++ ) {
        possessionBuyCostList[ i ] = Math.round( 5 ** i * ( 2 + 5 * rnd ) * 20 );
        possessionSellCostList[ i ] = Math.round( 0.7 * possessionBuyCostList[ i ] * ( rnd + 0.3 ) );
    }

    store.dispatch(setPossessionBuyCostList( possessionBuyCostList ));
    store.dispatch(setPossessionSellCostList( possessionSellCostList, true ));

}