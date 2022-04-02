import apiService from "../service/api.service";

export const ACTION_TYPES = {
    FETCH_ALL_ROOM: "FETCH_ALL_ROOM",
    ADD_ROOM: "ADD_ROOM",
};

export const fetchAllRoom = () => (dispatch) => {
    apiService
        .room()
        .fetchAllRoom()
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_ROOM,
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
// export const addAdmin = (admin) => {
//     return apiService.account().add_admin(admin)
// };
// export const register = (account) => {
//     return apiService.account().register(account);
// };
