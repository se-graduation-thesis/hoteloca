import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import { accountReducer } from '../reducers/account.reducer';
import { managerReducer } from '../reducers/manager.reducer';
import { roomReducer } from '../reducers/room.reducer';
import { serviceReducer } from '../reducers/service.reducer';

import { brandReducer } from 'reducers/brand.reducer';
import { categoryReducer } from 'reducers/category.reducer';
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    account: accountReducer,
    manager: managerReducer,
    room: roomReducer,
    service: serviceReducer,
    brand: brandReducer,
    category: categoryReducer

});

export default reducer;
