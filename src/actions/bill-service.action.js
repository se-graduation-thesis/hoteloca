import apiService from "../service/api.service";

export const ACTION_TYPES = {
    ADD_BILL_SERVICE: "ADD_BILL_SERVICE",
    FIND_BY_BILL_ID: "FIND_BY_BILL_ID"
};


export const add_bill_service = (bill) => {
    return apiService
        .bill_service()
        .add_bill_service(bill)
};
export const find_by_billId = (id) => (dispatch) => {
    apiService
        .bill_service()
        .find_by_id_bill(id)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.FIND_BY_BILL_ID,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};