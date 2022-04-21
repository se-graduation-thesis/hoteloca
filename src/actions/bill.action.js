import apiService from "../service/api.service";

export const ACTION_TYPES = {
    ADD_BILL: "ADD_BILL",
    FETCH_BILL_BY_STATUS: "FETCH_BILL_BY_STATUS",
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
        .catch((err) => console.log(err))
};

export const fetchBillByStatus = (status) => (dispatch) => {
    apiService
        .bill()
        .fetchAllBillByStatus(status)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.FETCH_BILL_BY_STATUS,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
}

