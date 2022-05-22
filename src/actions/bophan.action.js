import apiService from "../service/api.service";

export const ACTION_TYPES = {
    FETCH_ALL_BOPHAN: "FETCH_ALL_BOPHAN",
};

export const fetchAllBoPhan = () => (dispatch) => {
    apiService
        .bo_phan()
        .findAll()
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_BOPHAN,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};