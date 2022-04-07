import { ACTION_TYPES } from "../actions/customer.action";

const initialState = {
    customers: [],
};

export const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_CUSTOMER:
            return {
                ...state,
                customers: [...action.payload],
            };
        case ACTION_TYPES.ADD_CUSTOMER:
            return {
                ...state,
                customers: [...action.payload],
            }
        default:
            return state;
    }
};