import { ACTION_TYPES } from "../actions/room.action";

const initialState = {
    rooms: [],
    room_by_brand: [],
    room_by_name: {},
};

export const roomReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_ROOM_BY_CATEGORY:
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
        case ACTION_TYPES.GET_ROOM_BY_NAME:
            return {
                room_by_name: action.payload
            }
        default:
            return state;
    }
};