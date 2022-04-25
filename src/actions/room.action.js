import apiService from "../service/api.service";

export const ACTION_TYPES = {
    FETCH_ALL_ROOM_BY_CATEGORY: "FETCH_ALL_ROOM_BY_CATEGORY",
    ADD_ROOM: "ADD_ROOM",
    GET_ALL_ROOM_BY_BRAND: "GET_ALL_ROOM_BY_BRAND",
    GET_ROOM_BY_NAME: "GET_ROOM_BY_NAME",
    GET_ALL_ROOM: "GET_ALL_ROOM"
};

export const fetchAllRoom = () => (dispatch) => {
    apiService
        .room()
        .get_all_roomm()
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.GET_ALL_ROOM,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

export const fetchAllRoomByCategory = (id, kid) => (dispatch) => {
    apiService
        .room()
        .fetchAllRoomByCategory(id, kid)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_ROOM_BY_CATEGORY,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

export const addRoom = (room) => (dispatch) => {
    apiService
        .room()
        .add_room(room)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.ADD_ROOM,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};
export const get_all_room_by_brand = (id) => (dispatch) => {
    apiService
        .room()
        .get_all_room_by_brand(id)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.GET_ALL_ROOM_BY_BRAND,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

export const get_room_by_name = (name) => (dispatch) => {
    apiService
        .room()
        .get_room_by_name(name)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.GET_ROOM_BY_NAME,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};
// export const addAdmin = (admin) => {
//     return apiService.account().add_admin(admin)
// };
// export const register = (account) => {
//     return apiService.account().register(account);
// };
