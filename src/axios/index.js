import axios from 'axios'

const axiosInstance = axios.create(
    {
        baseURL: `${process.env.REACT_APP_BACKEND_ENDPOINT}/api`,
        headers: {
            Authorization: ''
        }
    }
)

let interceptor

const addAuthTokenInterceptor = (token) => {
    if (token)
        interceptor = axiosInstance.interceptors.request.use((response) => {
            response.headers.Authorization = `Bearer ${token}`
            return response
        })
}

const removeAuthTokenInterceptor = () => {
    axiosInstance.interceptors.request.eject(interceptor)
}

export { axiosInstance as axios, addAuthTokenInterceptor, removeAuthTokenInterceptor }