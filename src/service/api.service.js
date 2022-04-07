import axios from "axios";

const baseApi = 'http://localhost:5000/api/';
// const SOCKET_URL = "ws://localhost:3030/";

export default {
    account(url = baseApi + 'account/') {
        return {
            fetchAll: () => axios.get(url + 'get-all-account'),
            register: (account) => axios.post(url + "register", account),
            login: (username, pass) => axios.post(url + "login/" + username + "&" + pass),
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
            get_all_room_by_brand: (id) => axios.get(url + "get-all-room-by-brand/" + id)
        }
    },
    service(url = baseApi + 'service/') {
        return {
            fetchAllService: () => axios.get(url + 'get-all-service'),
            add_service: (service) => axios.post(url, service),
        }
    },
    brand(url = baseApi + 'brand/') {
        return {
            fetchAllBrand: () => axios.get(url + 'get-all-brand'),
            insertBrand: (brand) => axios.post(url + 'add-brand', brand),
            findById: (id) => axios.get(url + 'find-by-id/' + id),
        };
    },
    category(url = baseApi + 'category/') {
        return {
            fetchAllCategory: () => axios.get(url + 'get-all-category'),
            insertCategory: (category) => axios.post(url + 'add-category', category),
            findById: (id) => axios.get(url + 'find-by-id/' + id),
        };
    },
    customer(url = baseApi + 'customer/') {
        return {
            fetchAllCustomer: () => axios.get(url + 'get-all-customer'),
            add_customer: (customer) => axios.post(url, customer),
        }
    },
}
