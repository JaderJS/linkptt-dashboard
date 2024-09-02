'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { getChannel } from "@/functions/channels"
import { deleteMessage } from "@/functions/message"
import { useMutation, useQuery } from "@tanstack/react-query"
import { formatDistanceToNow as toNow } from "date-fns"
import { ArrowBigDown, ArrowBigLeft, Trash } from "lucide-react"
import { toast } from "sonner"

export default function Channel({ params: { channelCuid } }: { params: { channelCuid: string } }) {

    const { data: channel, refetch } = useQuery({
        queryKey: [`get-channel-${channelCuid}`],
        queryFn: () => getChannel(channelCuid),
    })

    const { mutate: deleteChannelMutate } = useMutation({
        mutationFn: deleteMessage,
        onError: (error) => toast(error.message)
    })

    return (
        <>
            <header className="flex bg-primary gap-4 items-center justify-between p-4 ">
                <ArrowBigLeft className="border-2 rounded-full" size={32} />
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">{channel?.name}</h1>
            </header>

            

            <main className="p-2">
                {channel?.messages.map((message) => (
                    <Card key={message.id} className="relative p-2 ">
                        <Trash className="absolute top-0 right-0 hover:cursor-pointer" onClick={() => {
                            deleteChannelMutate(message.id)
                            refetch()
                        }} />
                        <CardContent>
                            <div className="flex items-end gap-x-4">
                                De:
                                <Avatar>
                                    <AvatarImage src={message.from.avatarUrl} />
                                    <AvatarFallback>{message.from.name}</AvatarFallback>
                                </Avatar>
                                Para:
                                <Avatar>
                                    <AvatarImage src={message?.toChannel?.profileUrl} />
                                    <AvatarFallback>{message?.toChannel?.name.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <audio controls>
                                    <source src={message.pathUrl} />
                                </audio>
                            </div>

                        </CardContent>
                    </Card>
                ))}
            </main>

            {/* Channel {channelCuid} */}
        </>
    )
}