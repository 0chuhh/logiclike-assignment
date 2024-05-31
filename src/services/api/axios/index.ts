import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://logiclike.com/docs/",
});

export default axiosInstance;