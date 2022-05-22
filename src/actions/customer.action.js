import apiService from "../service/api.service";

export const ACTION_TYPES = {
    FETCH_ALL_CUSTOMER: "FETCH_ALL_CUSTOMER",
    ADD_CUSTOMER: "ADD_CUSTOMER",
    GET_CUSTOMER_BY_ID: "GET_CUSTOMER_BY_ID",
    LIST_CUSTOMER_RENT: "LIST_CUSTOMER_RENT",
    SAVE_CUSTOMER: "SAVE_CUSTOMER",
    GET_CUSTOMER_BY_YEAR: "GET_CUSTOMER_BY_YEAR",
    GET_CUSTOMER_BY_MONTH: "GET_CUSTOMER_BY_MONTH",
    GET_CUSTOMER_BY_DAY: "GET_CUSTOMER_BY_DAY",
    TOP_CUSTOMER_BY_YEAR: "TOP_CUSTOMER_BY_YEAR",
    TOP_CUSTOMER_BY_MONTH: "TOP_CUSTOMER_BY_MONTH",
    UPDATE_CUSTOMNER: "UPDATE_CUSTOMNER"
};

export const fetchAllCustomer = () => (dispatch) => {
    apiService
        .customer()
        .fetchAllCustomer()
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_CUSTOMER,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

export const getCustomerById = (id) => (dispatch) => {
    apiService
        .customer()
        .getCustomerById(id)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.GET_CUSTOMER_BY_ID,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

export const addCustomer = (customer) => {
    return apiService
        .customer()
        .add_customer(customer)
};

export const listCustomerRent = () => (dispatch) => {
    apiService
        .customer()
        .listCustomerRent()
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.LIST_CUSTOMER_RENT,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

export const save_customer = (cus) => (dispatch) => {
    apiService
        .customer()
        .save_customer(cus)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.SAVE_CUSTOMER,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};
export const updateCustomer = (cus) => (dispatch) => {
    apiService
        .customer()
        .updateCustomer(cus)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.UPDATE_CUSTOMNER,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};
export const register = (customer) => {
    return apiService
        .customer()
        .register(customer)
};

export const getKhachHangByYear = (year) => (dispatch) => {
    apiService
        .customer()
        .getKhachHangByYear(year)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.GET_CUSTOMER_BY_YEAR,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

export const getKhachHangByMonth = (year, month) => (dispatch) => {
    apiService
        .customer()
        .getKhachHangByMonth(year, month)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.GET_CUSTOMER_BY_MONTH,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

export const getKhachHangByDay = (year, month, Day) => (dispatch) => {
    apiService
        .customer()
        .getKhachHangByDay(year, month, Day)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.GET_CUSTOMER_BY_DAY,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

export const topKhachHangByYear = (year) => (dispatch) => {
    apiService
        .customer()
        .topKhachHangByYear(year)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.TOP_CUSTOMER_BY_YEAR,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

export const topKhachHangByMonth = (year, month) => (dispatch) => {
    apiService
        .customer()
        .topKhachHangByMonth(year, month)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.TOP_CUSTOMER_BY_MONTH,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};