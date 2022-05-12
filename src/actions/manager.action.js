import apiService from "../service/api.service";

export const ACTION_TYPES = {
    FETCH_ALL_MANAGER: "FETCH_ALL_MANAGER",
    FETCH_ALL_MANAGER_NONE_ACCOUNT: "FETCH_ALL_MANAGER_NONE_ACCOUNT",
    ADD_EMPLOYEE: "ADD_EMPLOYEE",
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

export const add_Employee = (employee) => (dispatch) => {
    apiService
        .manager()
        .add_Employee(employee)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.ADD_EMPLOYEE,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};
