import { api } from "@/axios"
import { Axios, AxiosResponse } from "axios"

export interface ActiveUsersProps {
    cuid: string
    email: string
    name: string
    isActive: boolean
}
export async function activedUsers(): Promise<ActiveUsersProps[]> {
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

export interface UpdateUserProps {
    avatarUrl?: string
}

export async function updateUser({ cuid, body }: { cuid: string, body: UpdateUserProps }): Promise<{ msg: string }> {
    const resp: AxiosResponse<{ msg: string }> = await api.post(`/user/${cuid}`, body)
    return resp.data
}

interface MyUserProps {
    msg: string
    user: UserProps
}

export async function myUser(token: string): Promise<MyUserProps> {
    const resp: AxiosResponse<MyUserProps> = await api.get(`/myuser`, { headers: { Authorization: `Bearer ${token}` } })
    return resp.data
}

export async function users(): Promise<ActiveUsersProps[]> {
    const resp: AxiosResponse<ActiveUsersProps[]> = await api.get(`/users`)
    return resp.data
}

export interface AllUsersProps {
    cuid: string
    name: string
    email: string
}

export async function getAllUsers(): Promise<{ msg: string, users: AllUsersProps[] }> {
    const resp: AxiosResponse<{ msg: string, users: AllUsersProps[] }> = await api.get(`/allusers`)
    return resp.data
}