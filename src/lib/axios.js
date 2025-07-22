import axios from "axios"

export const axiosInstance = axios.create(
    {
        baseURL: "http://147.93.105.148:3000//api",
        withCredentials: true //we want to send cookies throughout 
    }
)