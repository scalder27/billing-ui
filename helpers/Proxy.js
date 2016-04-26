import axios from "axios";

const axiosInstance = axios.create({
    headers: {
        "X-Requested-With": "XMLHttpRequest"
    }
});

export default axiosInstance;
