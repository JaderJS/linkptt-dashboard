'use client'
import HyperText from "@/components/magicui/hyper-text"
import { ImageUploader } from "@/components/my/image-uploader"
import { OnlineUsers } from "@/components/channel/onlineUsers"
import { Button } from "@/components/ui/button"
import { getChannel, UpdateOneChannelProps } from "@/functions/channels"
import { getAllUsers, updateUser, UpdateUserProps } from "@/functions/users"
import { useAuth } from "@/provider/user"
import { useMutation, useQuery } from "@tanstack/react-query"
import { LinkIcon } from "lucide-react"
import Link from "next/link"
import { channel } from "diagnostics_channel"

export default function Channel({ params: { channelCuid } }: { params: { channelCuid: string } }) {

    const { user } = useAuth()

    const { data } = useQuery({
        queryKey: [`get-channel-${channelCuid}`],
        queryFn: () => getChannel(channelCuid),
        refetchInterval: 5 * 60 * 1000,
        refetchOnWindowFocus: true
    })

    const { mutate: updateOneChannelMutate } = useMutation({
        mutationFn: (body: UpdateOneChannelProps) => UpdateOneChannelProps(channelCuid, body),
        mutationKey: [channelCuid]
    })
    return (
        <main className="flex  flex-col p-16">
            <header className="flex">
                {user && <ImageUploader
                    src={data?.channel.profileUrl}
                    onUpdate={(pathUrl) => {

                        updateOneChannelMutate({ profileUrl: pathUrl })
                    }} />}
                <div className="flex flex-col p-4">
                    {/* {channel && <HyperText
                        className="text-4xl font-bold text-black dark:text-white"
                        text={channel?.name}
                    />} */}
                    <Link href={`/dashboard/channel/${channelCuid}/messages`}>
                        <LinkIcon />
                    </Link>
                    <p className="text-muted">{data?.channel?.cuid}</p>
                    <p className="font-mono">{data?.channel?.owner.name}</p>
                </div>
            </header>

            {data && <OnlineUsers users={data.users} channelCuid={channelCuid} />}
        </main>
    )
}





