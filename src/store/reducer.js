import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import { accountReducer } from '../reducers/account.reducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    account: accountReducer
});

export default reducer;
