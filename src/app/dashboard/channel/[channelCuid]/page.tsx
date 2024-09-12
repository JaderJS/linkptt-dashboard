'use client'
import HyperText from "@/components/magicui/hyper-text"
import { ImageUploader } from "@/components/my/image-uploader"
import { OnlineUsers } from "@/components/my/online-users"
import { Button } from "@/components/ui/button"
import { getChannel } from "@/functions/channels"
import { getAllUsers, updateUser, UpdateUserProps } from "@/functions/users"
import { useAuth } from "@/provider/user"
import { useMutation, useQuery } from "@tanstack/react-query"
import { LinkIcon } from "lucide-react"
import Link from "next/link"


export default function Channel({ params: { channelCuid } }: { params: { channelCuid: string } }) {

    const { user } = useAuth()

    const { data: channel } = useQuery({
        queryKey: [`get-channel-${channelCuid}`],
        queryFn: () => getChannel(channelCuid),
    })

    const { data: users } = useQuery({
        queryKey: [`all-users`],
        queryFn: getAllUsers
    })

    const { mutate: updateUserMutate } = useMutation({
        mutationFn: (body: { cuid: string, body: UpdateUserProps }) => updateUser(body)
    })

    return (
        <main className="flex  flex-col p-16">
            <header className="flex">
                {user && <ImageUploader
                    src={user.avatarUrl}
                    onUpdate={(pathUrl) => {
                        updateUserMutate({ cuid: user.cuid, body: { avatarUrl: pathUrl } })
                    }} />}
                <div className="flex flex-col p-4">
                    {channel && <HyperText
                        className="text-4xl font-bold text-black dark:text-white"
                        text={channel?.name}
                    />}
                    <Link href={`/dashboard/channel/${channelCuid}/messages`}>
                        <LinkIcon />
                    </Link>
                    <p className="text-muted">{channel?.cuid}</p>
                    <p className="font-mono">{channel?.owner.name}</p>
                </div>
            </header>

            {channel && users && <OnlineUsers users={channel?.usersToChannels} allUsers={users.users} channelCuid={channelCuid} />}
        </main>
    )
}



