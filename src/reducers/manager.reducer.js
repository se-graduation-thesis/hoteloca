import { ACTION_TYPES } from "../actions/manager.action";

const initialState = {
    listManager: [],
    listManagerNone: [],
};

export const managerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_MANAGER:
            return {
                ...state,
                listManager: [...action.payload],
            };
        case ACTION_TYPES.FETCH_ALL_MANAGER_NONE_ACCOUNT:
            return {
                ...state,
                listManagerNone: [...action.payload],
            };
        case ACTION_TYPES.ADD_EMPLOYEE:
            return {
                ...state,
                listManager: [...action.payload],
            };
        default:
            return state;
    }
};