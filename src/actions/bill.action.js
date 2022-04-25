import apiService from "../service/api.service";

export const ACTION_TYPES = {
    ADD_BILL: "ADD_BILL",
    FETCH_BILL_BY_STATUS_ACCEPT: "FETCH_BILL_BY_STATUS_ACCEPT",
    FETCH_BILL_BY_STATUS_FINISH: "FETCH_BILL_BY_STATUS_FINISH",
    FETCH_BY_ID: "FETCH_BY_ID"
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

