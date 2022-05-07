import apiService from "../service/api.service";

export const ACTION_TYPES = {
    ADD_BILL_SERVICE: "ADD_BILL_SERVICE",
};


export const add_bill_service = (bill) => {
    return apiService
        .bill_service()
        .add_bill_service(bill)
};