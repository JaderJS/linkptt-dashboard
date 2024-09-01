'use client'

import { Channel, ChannelProps, insertUserInChannel, createChannel } from "@/functions/channels"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { formatDistanceToNow as toNow } from "date-fns"
import { ActivedUsersProps } from "@/functions/users"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useMutation } from "@tanstack/react-query"
import { Button } from "../ui/button"
import { UpsertChannelComponent } from "./upsert-channel"
import Link from "next/link"

export const ChannelsComponents = ({ channels, users }: { channels?: Channel[], users?: ActivedUsersProps[] }) => {
    const { mutate } = useMutation({
        mutationFn: insertUserInChannel,
    })


    const { mutate: createChannelMutation } = useMutation({
        mutationFn: createChannel
    })

    const change = (userCuid: string, channelCuid: string) => {
        mutate({ channelCuid: channelCuid, userCuid: userCuid })
    }
    return (
        <div>
            <UpsertChannelComponent />
            <Table>
                <TableCaption>Lista com os usuários</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>*</TableHead>
                        <TableHead>Cuid</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Dono</TableHead>
                        <TableHead>Usuários</TableHead>
                        <TableHead>Adicionar novos?</TableHead>
                        <TableHead>Alterar</TableHead>
                        <TableHead>Ultima alteração</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {channels?.map(({ cuid, name, owner, profileUrl, updatedAt, usersToChannels }, index) => (
                        <TableRow key={cuid}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                <Link href={`/dashboard/channel/${cuid}`} >
                                {cuid}
                                </Link>
                            </TableCell>
                            <TableCell>{name}</TableCell>
                            <TableCell>{owner.name}</TableCell>
                            <TableCell>{usersToChannels.map((usersToChannel) => usersToChannel.user.name).join(` | `)}</TableCell>
                            <TableCell>
                                {!!users && <Select key={0} onValueChange={(value) => { change(value, cuid) }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {users.map((user) => <SelectItem key={user.cuid} value={user.cuid}>{user.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>}
                            </TableCell>
                            <TableCell>
                                {/* <UpsertChannelComponent channel={{}} /> */}
                            </TableCell>
                            <TableCell>{toNow(updatedAt)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>

    )
}

