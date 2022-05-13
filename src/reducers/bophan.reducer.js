import { ACTION_TYPES } from "../actions/bophan.action";

const initialState = {
    bophans: [],
};

export const bophanReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_BOPHAN:
            return {
                ...state,
                bophans: [...action.payload],
            };
        default:
            return state;
    }
};
