import { ACTION_TYPES } from "../actions/bill.action";

const initialState = {
    listBillByStatus: [],
};

export const billReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_BILL_BY_STATUS:
            return {
                ...state,
                listBillByStatus: [...action.payload],
            };
        default:
            return state;
    }
};