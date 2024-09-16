'use client'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { formatDistanceToNow as toNow } from "date-fns"
import { ptBR } from 'date-fns/locale'
import { useQuery } from "@tanstack/react-query"
import { getChannels } from "@/functions/channels"
import { LinkIcon } from "lucide-react"
import { UpsertChannelComponent } from "@/components/channel/upsertChannel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Channels() {

    const { data: channels, isLoading } = useQuery({ queryKey: ['channels_'], queryFn: getChannels })


    return (
        <>
            <UpsertChannelComponent />
            <p className="text-2xl font-mono font-bold">Meus canais</p>
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
                                <Link href={`/dashboard/channel/${cuid}`} className="flex items-center gap-2">
                                    <LinkIcon className="h-4 w-4" />
                                    {cuid}
                                </Link>
                            </TableCell>
                            <TableCell>{name}</TableCell>
                            <TableCell>{owner.name}</TableCell>
                            <TableCell className="relative flex">
                                {usersToChannels.length !== 0 ? <>
                                    {usersToChannels?.map(({ user }, index) => (
                                        <div
                                            key={user.cuid}
                                            className={`absolute left-${index * 6} top-1 z-[${usersToChannels.length - index}]`}
                                        >
                                            <Avatar >
                                                <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                                                <AvatarImage src={user.avatarUrl} />
                                            </Avatar>
                                        </div>

                                    ))}
                                </> : 'Sem usuários'}
                            </TableCell>
                            <TableCell>{toNow(updatedAt, { locale: ptBR })}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>

    )
}