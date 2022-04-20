import apiService from "../service/api.service";

export const ACTION_TYPES = {
    FETCH_ALL_CUSTOMER: "FETCH_ALL_CUSTOMER",
    ADD_CUSTOMER: "ADD_CUSTOMER",
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

export const addCustomer = (customer) => (dispatch) => {
    apiService
        .customer()
        .add_customer(customer)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.ADD_CUSTOMER,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};