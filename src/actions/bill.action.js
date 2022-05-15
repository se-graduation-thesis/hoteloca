import apiService from "../service/api.service";

export const ACTION_TYPES = {
    ADD_BILL: "ADD_BILL",
    FETCH_BILL_BY_STATUS_ACCEPT: "FETCH_BILL_BY_STATUS_ACCEPT",
    FETCH_BILL_BY_STATUS_FINISH: "FETCH_BILL_BY_STATUS_FINISH",
    FETCH_BILL_BY_STATUS_CANCEL: "FETCH_BILL_BY_STATUS_CANCEL",
    FETCH_BY_ID: "FETCH_BY_ID",
    UPDATE_BILL: "UPDATE_BILL",
    UPDATE_STATE_OF_BILL: "UPDATE_STATE_OF_BILL",
};


export const addBill = (bill) => {
    return apiService
        .bill()
        .add_bill(bill)
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

export const fetchBillByStatusCancel = () => (dispatch) => {
    apiService
        .bill()
        .fetchAllBillByStatusCancel()
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.FETCH_BILL_BY_STATUS_CANCEL,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

export const fetchById = (id) => (dispatch) => {
    apiService
        .bill()
        .fetchBillById(id)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.FETCH_BY_ID,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

export const updateBill = (id) => (dispatch) => {
    apiService
        .bill()
        .updateBill(id)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.UPDATE_BILL,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

export const updateStateOfBill = (id, state) => (dispatch) => {
    apiService
        .bill()
        .updateStateOfBill(id, state)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.UPDATE_STATE_OF_BILL,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

