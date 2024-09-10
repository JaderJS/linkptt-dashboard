import { api } from "@/axios"
import { AxiosResponse } from "axios"

export interface ActivedUsersProps {
    cuid: string
    email: string
    name: string
    isActive: boolean
}
export async function activedUsers(): Promise<ActivedUsersProps[]> {
    return (await api.get(`/users`)).data.users
}

interface UserProps {
    cuid: string
    email: string
    name: string
    avatarUrl: string
}

interface LoginUserProps {
    msg: string
    data: {
        user: UserProps,
        token: string
    }
}

export async function loginUser(body: { email: string, password: string }): Promise<LoginUserProps> {
    const resp: AxiosResponse<LoginUserProps> = await api.post(`/user/login`, body)
    return resp.data
}