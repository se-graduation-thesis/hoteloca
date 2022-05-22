import apiService from "../service/api.service";

export const ACTION_TYPES = {
    GET_BY_PHONG: "GET_BY_PHONG",
};

export const getByPhong = (id) => (dispatch) => {
    apiService
        .phongTN()
        .getByPhongId(id)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.GET_BY_PHONG,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
}

