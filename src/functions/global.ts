import { APP_ROUTES } from "@/app/constants/app-routes"
import { api } from "@/axios"

export async function lifeServer() {
    const resp = await api.get(`/`)
    return resp
}

export const checkIsPublicRoute = (asPath: string) => {
    const appPublicRoutes = Object.values(APP_ROUTES.public)
    return appPublicRoutes.includes(asPath)
}