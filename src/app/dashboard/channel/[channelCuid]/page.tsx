'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
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
        onError: (error) => toast(error.message),
        onSuccess: () => refetch(),
    })

    return (
        <>

            <main className="flex flex-col gap-2 p-2">
                {channel?.messages.map((message) => (
                    <Card key={message.id} className="relative p-2 ">
                        <Button onClick={() => { deleteChannelMutate(message.id) }} className="absolute -top-1 -right-1 rounded-full" size="icon">
                            <Trash />
                        </Button>

                        <CardContent className="flex items-end gap-x-4">
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
                        </CardContent>
                    </Card>
                ))}
            </main>
        </>
    )
}