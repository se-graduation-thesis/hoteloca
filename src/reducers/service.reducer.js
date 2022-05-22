import { ACTION_TYPES } from "../actions/service.action";

const initialState = {
    services: [],
    services_not_use: []
};

export const serviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_SERVICE:
            return {
                ...state,
                services: [...action.payload],
            };
        case ACTION_TYPES.ADD_SERVICE:
            return {
                ...state,
                services: [...action.payload],
            }
        case ACTION_TYPES.SERVICE_NOT_USE:
            return {
                ...state,
                services_not_use: [...action.payload],
            }
        default:
            return state;
    }
};