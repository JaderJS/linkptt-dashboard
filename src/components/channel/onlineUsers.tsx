'use client'
import { useMutation } from "@tanstack/react-query"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { insertUserInChannel, UsersToChannel } from "@/functions/channels"
import { ActiveUsersProps, AllUsersProps } from "@/functions/users"
import { Badge } from "../ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface OnlineUsers {
    cuid: string
    name: string
    email: string
    avatarUrl: string
    isOnline: boolean
}

export const OnlineUsers = ({ users, channelCuid }: { users: OnlineUsers[], channelCuid: string }) => {

    const { mutate: insertUserInChannelMutate } = useMutation({
        mutationFn: insertUserInChannel,
    })

    const submit = (userCuid: string, channelCuid: string) => {
        insertUserInChannelMutate({ channelCuid: channelCuid, userCuid: userCuid })
    }

    return (
        <div className="space-y-4 py-8">
            <Select onValueChange={(value) => submit(value, channelCuid)}>
                <SelectTrigger>
                    <SelectValue placeholder="Selecione um usuário" />
                </SelectTrigger>
                <SelectContent>
                    {users.map((user) => (
                        <SelectItem value={ user.cuid} key={user.cuid}>{user.name} - {user.email}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Table>
                <TableCaption>Usuários atribuídos ao canal.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">#</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Cuid</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Nome</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users?.map(({ cuid, email, isOnline, name }, index) => (
                        <TableRow key={cuid}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                <Badge className={`${isOnline ? 'bg-emerald-500' : 'bg-red-500'}`}>{isOnline ? "Online" : "Offline"}</Badge>
                            </TableCell>
                            <TableCell>{cuid}</TableCell>
                            <TableCell>{email}</TableCell>
                            <TableCell>{name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}