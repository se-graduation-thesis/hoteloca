import apiService from "../service/api.service";

export const ACTION_TYPES = {
    FETCH_BILL_DETAIL_BY_STATUS: "FETCH_BILL_DETAIL_BY_STATUS",
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
