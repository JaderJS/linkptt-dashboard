import { APP_ROUTES } from "@/app/constants/app-routes"
import { api } from "@/axios"
import { AxiosResponse } from "axios"

export async function lifeServer() {
    const resp = await api.get(`/`)
    return resp
}

export async function checkIsPublicRoute(asPath: string) {
    const appPublicRoutes = Object.values(APP_ROUTES.public)
    return appPublicRoutes.includes(asPath)
}

interface UploadImageProps {
    msg: string
    image: {
        pathUrl: string
        path: string
    }
}

export async function uploadImage(formData: FormData): Promise<UploadImageProps> {
    const resp: AxiosResponse<UploadImageProps> = await api.post(`/upload/image`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
    return resp.data
}