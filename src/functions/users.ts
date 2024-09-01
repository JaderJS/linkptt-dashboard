import { api } from "@/axios"

export interface ActivedUsersProps {
    cuid: string
    email: string
    name: string
    isActive: boolean
}
export async function activedUsers(): Promise<ActivedUsersProps[]> {
    return (await api.get(`/users`)).data.users
}