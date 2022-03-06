import axios from "axios";

const baseApi = "http://localhost:5000/api/";
// const SOCKET_URL = "ws://localhost:3030/";

export default {
    account() {
        return {
            fetchAll: () => axios.get("http://localhost:5000/api/account/get-all-account"),
        };
    },
};
