import { ACTION_TYPES } from "../actions/bill-service.action";

const initialState = {
    bill_service: null,
};

export const billServiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.ADD_BILL_SERVICE:
            return {
                ...state,
                bill_service: action.payload,
            };
        default:
            return state;
    }
};