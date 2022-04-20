import { ACTION_TYPES } from "../actions/brand.action";

const initialState = {
    listBrand: [],
    brand_by_id: null
};

export const brandReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_BRAND:
            return {
                ...state,
                listBrand: [...action.payload],
            };
        case ACTION_TYPES.INSERT_BRAND:
            return {
                ...state,
                listBrand: [...action.payload],
            };
        default:
            return state;
    }
};