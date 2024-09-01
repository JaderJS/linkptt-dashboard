'use client'

import { Card, CardContent } from "@/components/ui/card"
import { getChannel } from "@/functions/channels"
import { useQuery } from "@tanstack/react-query"
import { formatDistanceToNow as toNow } from "date-fns"

export default function Channel({ params: { channelCuid } }: { params: { channelCuid: string } }) {

    const { data: channel } = useQuery({
        queryKey: [`get-channel-${channelCuid}`],
        queryFn: () => getChannel(channelCuid)
    })

    return (
        <>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">{channel?.name}</h1>
            <main>
                {channel?.messages.map((message) => (
                    <Card key={message.id}>
                        <CardContent>
                            <span>{message.pathUrl}</span>
                            <span>{message.transcript} {message.duration}s</span>
                            <p>from: {message.from.name} to: {message.toChannel?.name} {toNow(message.createdAt)}</p>
                        </CardContent>
                    </Card>
                ))}
            </main>

            {/* Channel {channelCuid} */}
        </>
    )
}