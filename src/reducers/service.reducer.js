import { ACTION_TYPES } from "../actions/service.action";

const initialState = {
    services: [],
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
        default:
            return state;
    }
};