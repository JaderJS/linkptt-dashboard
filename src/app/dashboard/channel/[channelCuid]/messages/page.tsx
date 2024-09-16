'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { getChannel } from "@/functions/channels"
import { deleteMessage, getManyMessagesToChannel } from "@/functions/message"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { formatDistanceToNow as toNow } from "date-fns"
import { ArrowBigDown, ArrowBigLeft, Trash } from "lucide-react"
import { toast } from "sonner"

export default function Channel({ params: { channelCuid } }: { params: { channelCuid: string } }) {

    const queryClient = useQueryClient()

    const { data, refetch } = useQuery({
        queryKey: [`get-channel-${channelCuid}`],
        queryFn: () => getManyMessagesToChannel(channelCuid),
    })

    const { mutate: deleteChannelMutate } = useMutation({
        mutationFn: deleteMessage,
        onError: (error) => toast(error.message),
    })
    
    if (data?.channel?.messages?.length === 0) {
        return (
            <main className="flex items-center justify-center">
                <p className="text-4xl font-mono font-semibold">Sem mensagens</p>
            </main>
        )
    }

    return (
        <>
            <main className="flex flex-col gap-2 p-2">
                {data?.channel?.messages.map((message) => (
                    <Card key={message.id} className="relative p-2 ">
                        <Button onClick={() => { deleteChannelMutate(message.id) }} className="absolute -top-1 -right-1 rounded-full" size="icon">
                            <Trash />
                        </Button>

                        <CardHeader>
                            <CardTitle className="flex gap-x-4 text-xs items-end">
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
                            </CardTitle>

                        </CardHeader>

                        <CardContent className="flex items-end gap-x-4">

                            <audio controls>
                                <source src={message.pathUrl} />
                            </audio>

                            <Textarea className="border-0" defaultValue={message.transcript || "Processando fala..."}>
                            </Textarea>
                        </CardContent>
                        <CardFooter className="text-muted text-sm">
                            {toNow(message.createdAt)}
                        </CardFooter>
                    </Card>
                ))}
            </main>
        </>
    )
}