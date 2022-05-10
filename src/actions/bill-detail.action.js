import apiService from "../service/api.service";

export const ACTION_TYPES = {
    FETCH_BILL_DETAIL_BY_STATUS: "FETCH_BILL_DETAIL_BY_STATUS",
    ADD_BILL_DETAIL: "ADD_BILL_DETAIL",
    GET_BILL_DETAIL_BY_BILL: "GET_BILL_DETAIL_BY_BILL",
    UPDATE_BILL_DETAIL: "UPDATE_BILL_DETAIL",
};

export const fetchBillDetaiByStatus = (status) => (dispatch) => {
    apiService
        .bill_detail()
        .fetchAllBillDetailByStatus(status)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.FETCH_BILL_DETAIL_BY_STATUS,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

export const addBillDetail = (billDetail) => (dispatch) => {
    apiService
        .bill_detail()
        .add_bill_detail(billDetail)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.ADD_BILL_DETAIL,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

export const getBillDetailByBill = (id) => (dispatch) => {
    apiService
        .bill_detail()
        .getBillDetailByBill(id)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.GET_BILL_DETAIL_BY_BILL,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

export const updateBillDetail = (id) => (dispatch) => {
    apiService
        .bill_detail()
        .updateBillDetail(id)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.UPDATE_BILL_DETAIL,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};