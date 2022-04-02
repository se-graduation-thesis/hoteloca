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
    room(url = baseApi + 'room/') {
        return {
            fetchAllRoom: () => axios.get(url + 'get-all-room'),
            add_room: (room) => axios.post(url, room),
            brand(url = baseApi + 'brand/') {
                return {
                    fetchAllBrand: () => axios.get(url + 'get-all-brand'),
                    insertBrand: (brand) => axios.post(url + 'add-brand', brand),
                    findById: (id) => axios.get(url + 'find-by-id/' + id),
                };
            },
        }
    },
    brand(url = baseApi + 'brand/') {
        return {
            fetchAllBrand: () => axios.get(url + 'get-all-brand'),
            insertBrand: (brand) => axios.post(url + 'add-brand', brand),
            findById: (id) => axios.get(url + 'find-by-id/' + id),
        };
    },
}
