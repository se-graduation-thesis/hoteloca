import { ACTION_TYPES } from "../actions/bill-detail.action";

const initialState = {
    listBillByStatus: [],
};

export const billDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_BILL_DETAIL_BY_STATUS:
            return {
                ...state,
                listBillByStatus: [...action.payload],
            };
        default:
            return state;
    }
};