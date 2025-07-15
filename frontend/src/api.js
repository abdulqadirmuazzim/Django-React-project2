import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const prodApiUrl = "https://020d6576-5834-47c7-80ba-8dfb92d65325-dev.e1-us-east-azure.choreoapis.dev/django-react-project2/edupath/v1"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL? import.meta.env.VITE_API_URL : prodApiUrl
})

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
},
(error) => {
    return Promise.reject(error)
})

export default api