import { ACTION_TYPES } from "../actions/room.action";

const initialState = {
    rooms: [],
};

export const roomReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_ROOM:
            return {
                ...state,
                rooms: [...action.payload],
            };
        case ACTION_TYPES.ADD_ROOM:
            return {
                ...state,
                rooms: [...action.payload],
            }
        default:
            return state;
    }
};