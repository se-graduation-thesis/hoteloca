import apiService from "../service/api.service";

export const ACTION_TYPES = {
    ADD_BILL: "ADD_BILL",
};


export const addBill = (bill) => (dispatch) => {
    apiService
        .bill()
        .add_bill(bill)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.ADD_BILL,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};