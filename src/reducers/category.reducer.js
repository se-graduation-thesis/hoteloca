import { ACTION_TYPES } from "../actions/category.action";

const initialState = {
    listCategory: [],
    brand_by_id: null
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_CATEGORY:
            return {
                ...state,
                listCategory: [...action.payload],
            };
        case ACTION_TYPES.INSERT_CATEGORY:
            return {
                ...state,
                listCategory: [...action.payload],
            };
        default:
            return state;
    }
};