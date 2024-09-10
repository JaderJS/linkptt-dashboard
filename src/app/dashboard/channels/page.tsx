'use client'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { formatDistanceToNow as toNow } from "date-fns"
import { useQuery } from "@tanstack/react-query"
import { getChannels } from "@/functions/channels"
import { LinkIcon } from "lucide-react"

export default function Channels() {

    const { data: channels, isLoading } = useQuery({ queryKey: ['channels_'], queryFn: getChannels })

    return (
        <>
            <Table>
                <TableCaption>Lista com os usuários</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>*</TableHead>
                        <TableHead>Cuid</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Dono</TableHead>
                        <TableHead>Usuários</TableHead>
                        <TableHead>Ultima alteração</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {channels?.map(({ cuid, name, owner, profileUrl, updatedAt, usersToChannels }, index) => (
                        <TableRow key={cuid}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                <Link href={`/dashboard/channel/${cuid}`}  className="flex items-center gap-2">
                                    <LinkIcon className="h-4 w-4"/>
                                    {cuid}
                                </Link>
                            </TableCell>
                            <TableCell>{name}</TableCell>
                            <TableCell>{owner.name}</TableCell>
                            <TableCell>{usersToChannels.length !== 0 ? usersToChannels?.map((usersToChannel) => usersToChannel.user.name).join(` | `) : 'Sem usuários'}</TableCell>
                            <TableCell>{toNow(updatedAt)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>

    )
}