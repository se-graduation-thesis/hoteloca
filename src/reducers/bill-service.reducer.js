import { ACTION_TYPES } from "../actions/bill-service.action";

const initialState = {
    bill_service: null,
    bill_service_id: null
};

export const billServiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.ADD_BILL_SERVICE:
            return {
                ...state,
                bill_service: action.payload,
            };
        case ACTION_TYPES.FIND_BY_BILL_ID:
            return {
                ...state,
                bill_service_id: action.payload,
            };
        default:
            return state;
    }
};