import { ACTION_TYPES } from "../actions/manager.action";

const initialState = {
    listManager: [],
};

export const managerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_MANAGER:
            return {
                ...state,
                listManager: [...action.payload],
            };
        default:
            return state;
    }
};