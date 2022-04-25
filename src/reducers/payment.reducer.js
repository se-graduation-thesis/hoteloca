import { ACTION_TYPES } from "../actions/bill.action";

const initialState = {
    payment: null,
};

export const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.ADD_BILL:
            return {
                ...state,
                payment: action.payload,
            }
        default:
            return state;
    }
};