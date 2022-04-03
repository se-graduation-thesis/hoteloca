import { ACTION_TYPES } from "../actions/room.action";

const initialState = {
    rooms: [],
    room_by_brand: []
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
        case ACTION_TYPES.GET_ALL_ROOM_BY_BRAND:
            return {
                ...state,
                room_by_brand: [...action.payload],
            }
        default:
            return state;
    }
};