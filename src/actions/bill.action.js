import apiService from "../service/api.service";

export const ACTION_TYPES = {
    ADD_BILL: "ADD_BILL",
    FETCH_BILL_BY_STATUS_ACCEPT: "FETCH_BILL_BY_STATUS_ACCEPT",
    FETCH_BILL_BY_STATUS_FINISH: "FETCH_BILL_BY_STATUS_FINISH"
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
export const fetchBillByStatusAccept = () => (dispatch) => {
    apiService
        .bill()
        .fetchAllBillByStatusAccept()
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.FETCH_BILL_BY_STATUS_ACCEPT,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

export const fetchBillByStatusFinish = () => (dispatch) => {
    apiService
        .bill()
        .fetchAllBillByStatusFinish()
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.FETCH_BILL_BY_STATUS_FINISH,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};
