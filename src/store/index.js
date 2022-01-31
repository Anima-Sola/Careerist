import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { gameSettingsReducer } from './reducers/GameSettingsReducer';
import { appSettingsReducer } from './reducers/AppSettingsReducer';

const rootReducer = combineReducers({
    gameSettingsReducer,
    appSettingsReducer
});

export default createStore(rootReducer, applyMiddleware(thunk));