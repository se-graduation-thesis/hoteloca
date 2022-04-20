import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import { accountReducer } from '../reducers/account.reducer';
import { managerReducer } from '../reducers/manager.reducer';
import { roomReducer } from '../reducers/room.reducer';
import { serviceReducer } from '../reducers/service.reducer';
import { customerReducer } from '../reducers/customer.reducer';

import { brandReducer } from 'reducers/brand.reducer';
import { categoryReducer } from 'reducers/category.reducer';
import taskReducer from 'reducers/booking.reducer';
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    account: accountReducer,
    manager: managerReducer,
    room: roomReducer,
    service: serviceReducer,
    brand: brandReducer,
    category: categoryReducer,
    customer: customerReducer,
    task: taskReducer,
});

export default reducer;
