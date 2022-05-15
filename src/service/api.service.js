import axios from "axios";

const baseApi = 'http://localhost:5000/api/';
// const SOCKET_URL = "ws://localhost:3030/";

export default {
    account(url = baseApi + 'account/') {
        return {
            fetchAll: () => axios.get(url + 'get-all-account'),
            register: (account) => axios.post(url + "employee/register", account),
            addAccoutNv: (account) => axios.put(url + "register", account),
            login: (username, pass) => axios.post(url + "login/" + username + "&" + pass),
            add_admin: (admin) => axios.post(url + "add-admin", admin),
            resetPass: (acc) => axios.put(url + "reset-password", acc),
            updateStatus: (acc) => axios.put(url + "update", acc)
        };
    },
    manager(url = baseApi + 'manager/') {
        return {
            fetchAllManager: () => axios.get(url + 'get-all-manager'),
            getNvNoneAccount: () => axios.get(url + 'get-all-manager-not-account'),
            add_Employee: (employee) => axios.post(url, employee),
            findById: (id) => axios.get(url + id),
        };
    },
    room(url = baseApi + 'room/') {
        return {
            fetchAllRoomByCategory: (id) => axios.get(url + 'getRoomBycategoryID/' + id),
            add_room: (room) => axios.post(url, room),
            get_all_room_by_brand: (id) => axios.get(url + "get-all-room-by-brand/" + id),
            get_room_by_name: (name) => axios.get(url + "getRoomByName/" + name),
            get_all_roomm: () => axios.get(url + "get-all-room"),
            get_by_id: (id) => axios.get(url + id),
            get_empty_room: (phong) => axios.post(url + "get-all-empty-room", phong)
        }
    },
    service(url = baseApi + 'service/') {
        return {
            fetchAllService: () => axios.get(url + 'get-all-service'),
            add_service: (service) => axios.post(url, service),
            serviceNotUse: (id) => axios.get(url + 'get-service-update/' + id),
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
            getCustomerById: (id) => axios.get(url + id),
            add_customer: (customer) => axios.post(url, customer),
            listCustomerRent: () => axios.get(url + 'get-all-customer-rent'),
            register: (customer) => axios.put(url + "register", customer),
            save_customer: (customer) => axios.post(url + "add", customer),
            getKhachHangByYear: (year) => axios.get(url + "thongke/" + year),
            getKhachHangByMonth: (year, month) => axios.get(url + "thongke/" + year + "/" + month),
            getKhachHangByDay: (year, month, day) => axios.get(url + "thongke/" + year + "/" + month + "/" + day),
            topKhachHangByYear: (year) => axios.get(url + "topByYear/" + year),
            topKhachHangByMonth: (year, month) => axios.get(url + "topByMonth/" + year + "/" + month),
        }
    },
    bill_detail(url = baseApi + 'bill-detail/') {
        return {
            fetchAllBillDetail: () => axios.get(url + 'get-all-bill-detail'),
            fetchAllBillDetailByStatus: (id) => axios.get(url + 'get-all-bill-detail-by-status/' + id),
            add_bill_detail: (billDetail) => axios.post(url, billDetail),
            getBillDetailByBill: (id) => axios.get(url + 'get-all-bill-detail-by-bill/' + id),
            getBillDetailByRoom: (id) => axios.get(url + 'get-all-bill-detail-by-room/' + id),
            updateBillDetail: (id) => axios.put(url + id),
        }
    },

    bill(url = baseApi + 'bill/') {
        return {
            fetchAllBillByStatusAccept: () => axios.get(url + 'get-all-bill-by-status-accept/'),
            fetchAllBillByStatus: (id) => axios.get(url + 'get-all-bill-by-status/' + id),
            add_bill: (bill) => axios.post(url, bill),
            fetchBillById: (id) => axios.get(url + 'get-by-id/' + id),
            updateBill: (id) => axios.put(url + id),
            updateStateOfBill: (id, state) => axios.put(url + 'trangThai/' + id + "/" + state),
            fetchAllBillByStatusFinish: () => axios.get(url + 'get-all-bill-by-status-finish/'),
            fetchAllBillByStatusCancel: () => axios.get(url + 'get-all-bill-by-status-cancel/')
        }
    },
    phongTN(url = baseApi + 'phongTN/') {
        return {
            getByPhongId: (id) => axios.get(url + 'get-by-phong/' + id),
        }
    },
    bill_service_detail(url = baseApi + 'bill-service-detail/') {
        return {
            add_bill_service_detail: (add_bill) => axios.post(url, add_bill),
            fetchAllBillDetailById: (id) => axios.get(url + 'get-all-by-bill-id/' + id),
            updateQuantity: (bill_service_detail) => axios.put(url + 'edit', bill_service_detail)
        }
    },
    bill_service(url = baseApi + 'service-bill/') {
        return {
            add_bill_service: (billService) => axios.post(url, billService),
            find_by_id_bill: (id) => axios.get(url + "find-by-id-bill/" + id)
        }
    },
    payment(url = baseApi + 'payment/') {
        return {
            add_payment: (payment) => axios.post(url, payment),
            get_all: () => axios.get(url + "get-all"),
            get_all_day: (day, month, year) => axios.get(url + "get-all-day/" + day + "&&" + month + "&&" + year),
            get_all_month: (month, year) => axios.get(url + "get-all-month/" + month + "&&" + year),
            get_all_year: (year) => axios.get(url + "get-all-year/" + year),
        }
    },
    bo_phan(url = baseApi + 'bophan/') {
        return {
            findAll: () => axios.get(url),
        }
    },
    upload(url = baseApi + "storage/") {
        return {
            upload_file: (formData) =>
                axios.post(url + "uploadFile/", formData, {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                }),
        };
    },
}
