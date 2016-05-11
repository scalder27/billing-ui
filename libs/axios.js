import axios from "axios";

const axiosInstance = axios.create({
    headers: { "X-Requested-With": "XMLHttpRequest" },
    params: { _: +new Date() }
});

export default axiosInstance;

