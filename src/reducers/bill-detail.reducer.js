import { ACTION_TYPES } from "../actions/bill-detail.action";

const initialState = {
    listBillByStatus: [],
    billDetail: null,
    billDetailByBill: [],
};

export const billDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_BILL_DETAIL_BY_STATUS:
            return {
                ...state,
                listBillByStatus: [...action.payload],
            };

        case ACTION_TYPES.ADD_BILL_DETAIL:
            return {
                ...state,
                billDetail: action.payload,
            };

        case ACTION_TYPES.GET_BILL_DETAIL_BY_BILL:
            return {
                ...state,
                billDetailByBill: [...action.payload],
            };

        case ACTION_TYPES.UPDATE_BILL_DETAIL:
            return {
                ...state,
                billDetailByBill: [...action.payload],
            };
        default:
            return state;
    }
};