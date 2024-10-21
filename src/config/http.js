import axios from "axios"
import UserService from "../core/user/infrastructure/http/UserService"
import { VITE_APP_API_URL } from "./environments"

const httpClientRepository = axios.create({
    baseURL: VITE_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization:
          typeof localStorage !== "undefined" && localStorage.getItem("authToken")
            ? `Bearer ${localStorage.getItem("authToken")}`
            : "",
    },
    withCredentials: false,
    timeout: 40000,
    responseType: "json",
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: 2000000,
    maxRedirects: 3,
})

httpClientRepository.interceptors.response.use(
    async (response) => {
        return response
    },
    (error) => {
        const userService = new UserService()
  
        if (error.response && error.response.status === 401) {
            userService.logout()
        }
        return Promise.reject(error)
    }
)

export default httpClientRepository
