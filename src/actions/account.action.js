import apiService from "../service/api.service";

export const ACTION_TYPES = {
    FETCH_ALL_ACCCOUNT: "FETCH_ALL_ACCCOUNT",
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT'

};
export const isAuthenticated = (userExitedid) => {
    return {
        type: 'AUTHENTICATE_SIGNAL',
        userExitedid: userExitedid,
    }
}
export const userlogout = () => {
    return {
        type: ACTION_TYPES.LOGOUT,
    }
}
export const login = (username, password) => {
    return apiService
        .account()
        .login(username, password)
}
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
