import apiService from "../service/api.service";

export const ACTION_TYPES = {
    ADD_PAYMENT: "ADD_PAYMENT",
};


export const addPay = (pay) => (dispatch) => {
    apiService
        .payment()
        .add_payment(pay)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.ADD_PAYMENT,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};