import apiService from "../service/api.service";

export const ACTION_TYPES = {
    FETCH_ALL_CATEGORY: "FETCH_ALL_CATEGORY",
    FETCH_ALL_CATEGORY_BY_BRAND: "FETCH_ALL_CATEGORY_BY_BRAND",
    INSERT_CATEGORY: "INSERT_CATEGORY",
    FIND_BY_ID_CATEGORY: "FIND_BY_ID_CATEGORY"
};

export const fetchAllCategory = () => (dispatch) => {
    apiService
        .category()
        .fetchAllCategory()
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_CATEGORY,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};
export const fetchAllCategoryByBrand = (id) => (dispatch) => {
    apiService
        .category()
        .fetchAllCategoryByBrand(id)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_CATEGORY_BY_BRAND,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};
export const insertCategory = (category) => (dispatch) => {
    apiService
        .category()
        .insertCategory(category)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.INSERT_CATEGORY,
                payload: response.data,
            });
        })
        .catch((err) => console.log(err));
};
export const findById = (id) => {
    return apiService
        .category()
        .findById(id)
};

