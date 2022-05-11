import apiService from "../service/api.service";

export const ACTION_TYPES = {
    FETCH_ALL_MANAGER: "FETCH_ALL_MANAGER",
    FETCH_ALL_MANAGER_NONE_ACCOUNT: "FETCH_ALL_MANAGER_NONE_ACCOUNT",
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
export const fetchAllManagernoneAccount = () => (dispatch) => {
    apiService
        .manager()
        .getNvNoneAccount()
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_MANAGER_NONE_ACCOUNT,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};
