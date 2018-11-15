import { combineReducers } from 'redux';
import missionsReducer from './missions';

const rootReducer = combineReducers({
    missions: missionsReducer,
});

export default rootReducer;
