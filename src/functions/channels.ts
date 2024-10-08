import { api } from "@/axios"
import { Axios, AxiosResponse } from "axios"

export interface ChannelsResponseProps {
    msg: string
    channels: ChannelProps[]
}

export interface ChannelProps {
    cuid: string
    name: string
    profileUrl: string
    ownerCuid: string
    createdAt: string
    updatedAt: string
    usersToChannels: any[]
    owner: Owner
}

export interface Owner {
    cuid: string
    email: string
    name: string
    password: string
    avatarUrl: string
}

export async function getChannels(): Promise<Channel[]> {
    const resp = await api.get(`/channels`)
    return resp.data.channels
}

interface ConnectUserToChannel {
    channelCuid: string
    userCuid: string
}


export interface Channel {
    cuid: string
    name: string
    profileUrl: string
    ownerCuid: string
    createdAt: string
    updatedAt: string
    usersToChannels: UsersToChannel[]
    owner: User
}

export interface UsersToChannel {
    userCuid: string
    channelCuid: string
    permission: string
    user: User
}

interface User {
    cuid: string
    email: string
    name: string
    password: string
    avatarUrl: string
}

interface CreatedChannelProps {
    name: string
    profileUrl: string
    ownerCuid: string
}
export async function insertUserInChannel(body: ConnectUserToChannel): Promise<Channel[]> {
    const resp = await api.post(`/channel/connect`, body)
    return resp.data.createOrConnect
}

export async function createChannel(body: CreatedChannelProps): Promise<Channel> {
    const resp = await api.post(`/channel`, body)
    return resp.data.channel
}

interface GetChannelProps {
    msg: string
    channel: {
        cuid: string
        name: string
        profileUrl: string
        _count: {
            messages: number
            usersToChannels: number
        }
        owner: {
            cuid: string
            email: string
            name: string
            avatarUrl: string
        }
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
        usersToChannels: UsersToChannel[]
    }
    users: {
        cuid: string
        name: string
        email: string
        avatarUrl: string
        isOnline: boolean
    }[]

}

export async function getChannel(cuid: string): Promise<GetChannelProps> {
    const resp = await api.get(`/channel/${cuid}`)
    return resp.data
}

//NEW

interface CreateOneChannelProps {
    name: string
    password: string
    profileUrl: string
}

export async function createOneChannel(body: CreateOneChannelProps) {
    const resp: AxiosResponse = await api.post(`/channel`, body)
    return resp.data
}

interface ResponseUpdateOneChannel {
    msg: string
    channel: {
        cuid: string
        name: string
        profileUrl: string
        ownerCuid: string
        createdAt: Date
        updatedAt: Date
    }
}

export interface UpdateOneChannelProps {
    profileUrl?: string
}

export async function UpdateOneChannelProps(channelCuid: string, body: UpdateOneChannelProps): Promise<ResponseUpdateOneChannel> {
    const resp: AxiosResponse = await api.put(`/channel/${channelCuid}`, body)
    return resp.data
}

interface CreateOneTokenProps {
    email: string
    password: string
}

export async function createOneTokenAccess(body: CreateOneTokenProps) {
    const resp: AxiosResponse = await api.post(`/channel/token`, body)
    return resp.data
}