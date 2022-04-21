import { ACTION_TYPES } from "../actions/bill.action";

const initialState = {
    listBillByStatus: [],
    bill: null
};

export const billReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_BILL_BY_STATUS:
            return {
                ...state,
                listBillByStatus: [...action.payload],
            };

        case ACTION_TYPES.ADD_BILL:
            return {
                ...state,
                bill: action.payload,
            };
        default:
            return state;
    }
};