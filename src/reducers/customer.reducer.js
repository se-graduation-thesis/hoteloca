import { ACTION_TYPES } from "../actions/customer.action";

const initialState = {
    customers: [],
    customer: {},
    listCustomerRent: [],
    customerByYear: [],
    customerByMonth: [],
    customerByDay: [],
    topByYear: [],
    topByMonth: [],
};

export const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_CUSTOMER:
            return {
                ...state,
                customers: [...action.payload],
            };
        case ACTION_TYPES.GET_CUSTOMER_BY_ID:
            return {
                ...state,
                customer: action.payload,
            };
        case ACTION_TYPES.ADD_CUSTOMER:
            return {
                ...state,
                customers: [...action.payload],
            }
        case ACTION_TYPES.LIST_CUSTOMER_RENT:
            return {
                ...state,
                listCustomerRent: [...action.payload],
            }
        case ACTION_TYPES.SAVE_CUSTOMER:
            return {
                ...state,
                customers: [...action.payload],
            }
        case ACTION_TYPES.GET_CUSTOMER_BY_YEAR:
            return {
                ...state,
                customerByYear: [...action.payload],
            }
        case ACTION_TYPES.GET_CUSTOMER_BY_MONTH:
            return {
                ...state,
                customerByMonth: [...action.payload],
            }
        case ACTION_TYPES.GET_CUSTOMER_BY_DAY:
            return {
                ...state,
                customerByDay: [...action.payload],
            }
        case ACTION_TYPES.TOP_CUSTOMER_BY_YEAR:
            return {
                ...state,
                topByYear: [...action.payload],
            }
        case ACTION_TYPES.TOP_CUSTOMER_BY_MONTH:
            return {
                ...state,
                topByMonth: [...action.payload],
            }
        case ACTION_TYPES.UPDATE_CUSTOMNER:
            return {
                ...state,
                customer: action.payload,
            }
        default:
            return state;
    }
};