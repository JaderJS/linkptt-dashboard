import axios from "axios"
import { getCookie } from "cookies-next"

export const api = axios.create({ baseURL: `http://localhost:8000/api` })

api.interceptors.request.use((req) => {
    const token = getCookie(`linkptt-dashboard`)
    if(!token){
        return req
    }
    
    req.headers.Authorization = `Bearer ${token}`
    return req
})
