import { ACTION_TYPES } from "../actions/phongTN.action";

const initialState = {
    tienNghiList: [],
};

export const phongTNReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.GET_BY_PHONG:
            return {
                ...state,
                tienNghiList: [...action.payload],
            };
        default:
            return state;
    }
};