import store from "../store";
import { rndBetweenMinusOneAndOne } from "./Random";
import { setPosWithinYear } from "../store/actions/actions";

const calcSubtotals = ( timeStep ) => {
    rndBetweenMinusOneAndOne();
    /*const commonSettings = store.getState().gameSettingsReducer.commonSettings;
    const posWithinYear = commonSettings.posWithinYear;
    store.dispatch(setPosWithinYear( posWithinYear + timeStep ));*/
}

export default calcSubtotals;

