import axios from "axios";
import config from "./config";

const {API_URL} = config
let authToken = null

axios.interceptors.request.use(req => {
    if (authToken) {
        req.headers['Authorization'] = authToken
    }

    return req;
});

export default {
    auth: {
        login: (email, socket) => {
            return axios.post(`${API_URL}/login`, {email, socketId: socket.id}).then(r => {
                authToken = r.data.id
                return r.data
            })
        },
    },
    friends: {
        query: () => {
            return axios.get(`${API_URL}/friends`).then(r => r.data)
        }
    }
}
