import axios from "axios";

const baseApi = 'http://localhost:5000/api/';
// const SOCKET_URL = "ws://localhost:3030/";

export default {
    account(url = baseApi + 'account/') {
        return {
            fetchAll: () => axios.get(url + 'get-all-account'),
            register: (account) => axios.post(url + "register", account),
            add_admin: (admin) => axios.post(url + "add-admin", admin),
        };
    },
    manager(url = baseApi + 'manager/') {
        return {
            fetchAllManager: () => axios.get(url + 'get-all-manager'),
        };
    },
};
