'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { getChannel } from "@/functions/channels"
import { deleteMessage } from "@/functions/message"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { formatDistanceToNow as toNow } from "date-fns"
import { ArrowBigDown, ArrowBigLeft, Trash } from "lucide-react"
import { toast } from "sonner"

export default function Channel({ params: { channelCuid } }: { params: { channelCuid: string } }) {
    const queryClient = useQueryClient()

    const { data: channel, refetch } = useQuery({
        queryKey: [`get-channel-${channelCuid}`],
        queryFn: () => getChannel(channelCuid),
    })

    const { mutate: deleteChannelMutate } = useMutation({
        mutationFn: deleteMessage,
        onError: (error) => toast(error.message),
        // async onSuccess(_, variables) {
        //     await queryClient.setQueryData([`get-channel-${channelCuid}`], (data: any) => {
        //         const newData = data.messages.filter((val: any) => val.id !== variables)
        //         const values = { ...data, messages: newData }
        //         return values
        //     })
        // },
    })

    return (
        <>

            <main className="flex flex-col gap-2 p-2">
                {channel?.messages.map((message) => (
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