import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { gameSettingsReducer } from './reducers/GameSettingsReducer';
import { appSettingsReducer } from './reducers/AppSettingsReducer';
import Reactotron from '../../ReactotronConfig';

const rootReducer = combineReducers({
    gameSettingsReducer,
    appSettingsReducer,
});

export default createStore(rootReducer, compose(applyMiddleware(thunk), Reactotron.createEnhancer()));