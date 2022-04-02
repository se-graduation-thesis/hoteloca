import apiService from "../service/api.service";

export const ACTION_TYPES = {
    FETCH_ALL_BRAND: "FETCH_ALL_BRAND",
    INSERT_BRAND: "INSERT_BRAND",
    FIND_BY_ID_BRAND: "FIND_BY_ID_BRAND"
};

export const fetchAllBrand = () => (dispatch) => {
    apiService
        .brand()
        .fetchAllBrand()
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_BRAND,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};
export const insertBrand = (brand) => (dispatch) => {
    apiService
        .brand()
        .insertBrand(brand)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.INSERT_BRAND,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};
export const findById = (id) => {
    return apiService
        .brand()
        .findById(id)
};

