import axios from "axios"

export const axiosInstance = axios.create(
    {
        baseURL: "https://api.letsgetmentor.com/api",
        withCredentials: true //we want to send cookies throughout 
    }
)