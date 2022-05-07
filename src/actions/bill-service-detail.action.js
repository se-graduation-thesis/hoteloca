import apiService from "../service/api.service";

export const ACTION_TYPES = {
    FETCH_BILL_SERVICE_DETAIL_BY_ID: "FETCH_BILL_SERVICE_DETAIL_BY_ID",
    ADD_BILL_SERVICE_DETAIL: "ADD_BILL_SERVICE_DETAIL",
};

export const fetchAllBillDetailById = (id) => (dispatch) => {
    apiService
        .bill_service_detail()
        .fetchAllBillDetailById(id)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.FETCH_BILL_SERVICE_DETAIL_BY_ID,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

export const add_bill_service_detail = (bill) => (dispatch) => {
    apiService
        .bill_service_detail()
        .add_bill_service_detail(bill)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.ADD_BILL_SERVICE_DETAIL,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};