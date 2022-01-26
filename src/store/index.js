import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { gameSettingsReducer } from './reducers/GameSettingsReducer';
import { wealthReducer } from './reducers/WealthReducer';

const rootReducer = combineReducers({
    gameSettingsReducer,
    wealthReducer
});

export default createStore(rootReducer, applyMiddleware(thunk));