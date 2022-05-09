import apiService from "../service/api.service";

export const ACTION_TYPES = {
    FETCH_ALL_SERVICE: "FETCH_ALL_SERVICE",
    ADD_SERVICE: "ADD_SERVICE",
    SERVICE_NOT_USE: "SERVICE_NOT_USE"
};

export const fetchAllService = () => (dispatch) => {
    apiService
        .service()
        .fetchAllService()
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_SERVICE,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};

export const serviceNotUse = (id) => (dispatch) => {
    apiService
        .service()
        .serviceNotUse(id)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.SERVICE_NOT_USE,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};


export const addService = (service) => (dispatch) => {
    apiService
        .service()
        .add_service(service)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.ADD_SERVICE,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};