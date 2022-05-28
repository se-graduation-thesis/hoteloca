import { ACTION_TYPES } from "../actions/bill.action";
import { ACTION_TYPES_PAY } from "actions/payment.action";
const initialState = {
    payment: null,
    all_payment: [],
    pay_day: [],
    pay_month: [],
    pay_year: [],
    paymentByCus: [],
};

export const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.ADD_BILL:
            return {
                ...state,
                payment: action.payload,
            }
        case ACTION_TYPES_PAY.GET_ALL:
            return {
                ...state,
                all_payment: [...action.payload],
            }
        case ACTION_TYPES_PAY.GET_ALL_DAY:
            return {
                ...state,
                pay_day: [...action.payload],
            }
        case ACTION_TYPES_PAY.GET_ALL_MONTH:
            return {
                ...state,
                pay_month: [...action.payload],
            }
        case ACTION_TYPES_PAY.GET_ALL_YEAR:
            return {
                ...state,
                pay_year: [...action.payload],
            }
        case ACTION_TYPES_PAY.GET_ALL_BY_CUS:
            return {
                ...state,
                paymentByCus: [...action.payload],
            }
        default:
            return state;
    }
};