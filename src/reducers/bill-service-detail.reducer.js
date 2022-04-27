import { ACTION_TYPES } from "../actions/bill-service-detail.action";

const initialState = {
    list_service_detail: [],
    bill_service_detail: null,
};

export const billServiceDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_BILL_SERVICE_DETAIL_BY_ID:
            return {
                ...state,
                list_service_detail: [...action.payload],
            };

        case ACTION_TYPES.ADD_BILL_SERVICE_DETAIL:
            return {
                ...state,
                bill_service_detail: action.payload,
            };
        default:
            return state;
    }
};