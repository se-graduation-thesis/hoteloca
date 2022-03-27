import apiService from "../service/api.service";

export const ACTION_TYPES = {
    FETCH_ALL_MANAGER: "FETCH_ALL_MANAGER",
};

export const fetchAllManager = () => (dispatch) => {
    apiService
        .manager()
        .fetchAllManager()
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_MANAGER,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

