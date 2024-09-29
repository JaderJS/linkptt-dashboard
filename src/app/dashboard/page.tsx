'use client'

import { ChannelsComponents } from "@/components/my/channels"
import { UserComponents } from "@/components/my/users"

import { ChannelProps, getChannels } from "@/functions/channels"
import { activeUsers } from "@/functions/users"
import { useMutation, useQuery } from "@tanstack/react-query"

export default function Dashboard() {

    const { data: users } = useQuery({ queryKey: ['active-users'], queryFn: activeUsers, refetchInterval: 10000 })
    const { data: channels } = useQuery({ queryKey: ['channels'], queryFn: getChannels })

    return (
        <main className="flex w-auto h-screen flex-col gap-4 p-12">

            <UserComponents users={users} />
            {/* <ChannelsComponents channels={channels} users={users} /> */}

        </main>
    )
}