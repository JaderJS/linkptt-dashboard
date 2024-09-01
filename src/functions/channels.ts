import { api } from "@/axios"

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

interface UsersToChannel {
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

export async function getChannel(cuid: string): Promise<GetChannelProps> {
    const resp = await api.get(`/channel/${cuid}`)
    return resp.data.channel
}