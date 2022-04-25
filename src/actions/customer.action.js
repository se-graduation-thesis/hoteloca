import apiService from "../service/api.service";

export const ACTION_TYPES = {
    FETCH_ALL_CUSTOMER: "FETCH_ALL_CUSTOMER",
    ADD_CUSTOMER: "ADD_CUSTOMER",
    GET_CUSTOMER_BY_ID: "GET_CUSTOMER_BY_ID",
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