import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient();

export const getUpdateLocalStorage = () => {
    const updateToken = localStorage.getItem("token");
    return updateToken;
}
export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API}`
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getUpdateLocalStorage();
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (err) => {
        Promise.reject(err);
    }
)