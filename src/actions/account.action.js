import apiService from "../service/api.service";

export const ACTION_TYPES = {
    FETCH_ALL_ACCCOUNT: "FETCH_ALL_ACCCOUNT",
};

export const fetchAllAccount = () => (dispatch) => {
    apiService
        .account()
        .fetchAll()
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_ACCCOUNT,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};
export const addAdmin = (admin) => {
    return apiService.account().add_admin(admin)
};
export const register = (account) => {
    return apiService.account().register(account);
};
