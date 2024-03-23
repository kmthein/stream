import { axiosInstance } from "./axiosInstance"

export const registerUser = async (payload) => {
    try {
        const response = await axiosInstance.post("/auth/user-register", payload, {
            validateStatus: () => true
          });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const loginUser = async (payload) => {
    try {
        const response = await axiosInstance.post("/auth/user-login", payload, {
            validateStatus: () => true
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}