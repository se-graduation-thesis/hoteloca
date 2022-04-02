import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import { accountReducer } from '../reducers/account.reducer';
import { managerReducer } from '../reducers/manager.reducer';
import { roomReducer } from '../reducers/room.reducer';
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    account: accountReducer,
    manager: managerReducer,
    room: roomReducer,
});

export default reducer;
