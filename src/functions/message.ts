import { api } from "@/axios"
import { AxiosResponse } from "axios"

interface ResponseGetManyMessagesToChannel {
    msg: string
    channel: {
        cuid: string
        name: string
        profileUrl: string
        messages: {
            id: number
            pathUrl: string
            path: string
            transcript: string
            duration: number
            createdAt: Date
            from: {
                cuid: string
                email: string
                name: string
                avatarUrl: string
            },
            toChannel?: {
                cuid: string
                name: string
                profileUrl: string
            },
            toUser?: {
                cuid: string
                name: string
                avatarUrl: string
            }
        }[]
    }

}

export async function getManyMessagesToChannel(cuid: string): Promise<ResponseGetManyMessagesToChannel> {
    const resp: AxiosResponse = await api.get(`/channel/${cuid}/messages`)
    return resp.data
}

export async function deleteMessage(id: number) {
    const resp = await api.delete(`/message/${id}`)
    return resp.data
}

