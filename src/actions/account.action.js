import apiService from "../service/api.service";

export const ACTION_TYPES = {
    FETCH_ALL_ACCCOUNT: "FETCH_ALL_ACCCOUNT",
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    ADD_ACCOUNT: "ADD_ACCOUNT",
    CHANGE_STATUS: "CHANGE_STATUS",
    RESET_PASS: "CHANGE_STATUS",
    GET_BY_ID: "GET_BY_ID",
    HASH_PASS: "HASH_PASS"

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
export const addAccoutNv = (acc) => (dispatch) => {
    apiService
        .account()
        .addAccoutNv(acc)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.ADD_ACCOUNT,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};
export const changeStatus = (acc) => (dispatch) => {
    apiService
        .account()
        .updateStatus(acc)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.CHANGE_STATUS,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};
export const resetPass = (acc) => (dispatch) => {
    apiService
        .account()
        .resetPass(acc)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.RESET_PASS,
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

export const getById = (id) => (dispatch) => {
    apiService
        .account()
        .getById(id)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.GET_BY_ID,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

export const hashPass = (taikhoan, pass) => {
    return apiService
        .account()
        .hashPass(taikhoan, pass)

};
