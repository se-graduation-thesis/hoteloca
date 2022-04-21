import { ACTION_TYPES } from "../actions/bill.action";

const initialState = {
    listBillByStatusAccept: [],
    listBillByStatusFinish: [],
};

export const billReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_BILL_BY_STATUS_ACCEPT:
            return {
                ...state,
                listBillByStatusAccept: [...action.payload],
            };
        case ACTION_TYPES.FETCH_BILL_BY_STATUS_FINISH:
            return {
                ...state,
                listBillByStatusFinish: [...action.payload],
            };
        default:
            return state;
    }
};