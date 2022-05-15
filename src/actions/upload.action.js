import apiService from "../service/api.service";

export const upload = (file) => {
    return apiService.upload().upload_file(file);
};
