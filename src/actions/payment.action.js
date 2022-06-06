import apiService from "../service/api.service";

export const ACTION_TYPES_PAY = {
    ADD_PAYMENT: "ADD_PAYMENT",
    GET_ALL: "GET_ALL",
    GET_ALL_DAY: "GET_ALL_DAY",
    GET_ALL_MONTH: "GET_ALL_MONTH",
    GET_ALL_YEAR: "GET_ALL_YEAR",
    GET_ALL_BY_CUS: "GET_ALL_BY_CUS"
};


export const addPay = (pay) => (dispatch) => {
    apiService
        .payment()
        .add_payment(pay)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES_PAY.ADD_PAYMENT,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};
export const get_all = () => (dispatch) => {
    apiService
        .payment()
        .get_all()
        .then((response) => {
            dispatch({
                type: ACTION_TYPES_PAY.GET_ALL,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};
export const get_all_day = (day, month, year) => (dispatch) => {
    apiService
        .payment()
        .get_all_day(day, month, year)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES_PAY.GET_ALL_DAY,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};
export const get_all_month = (month, year) => (dispatch) => {
    apiService
        .payment()
        .get_all_month(month, year)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES_PAY.GET_ALL_MONTH,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};
export const get_all_year = (year) => (dispatch) => {
    apiService
        .payment()
        .get_all_year(year)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES_PAY.GET_ALL_YEAR,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

export const get_all_by_cus = (id) => (dispatch) => {
    apiService
        .payment()
        .get_all_by_cus(id)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES_PAY.GET_ALL_BY_CUS,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};