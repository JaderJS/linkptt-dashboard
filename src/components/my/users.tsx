import { ActiveUsersProps } from "@/functions/users"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Badge } from "../ui/badge"

export const UserComponents = ({ users }: { users?: ActiveUsersProps[] }) => {
    
    return (
        <Table className="">
            <TableCaption>Lista com os usuários</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>*</TableHead>
                    <TableHead>Active?</TableHead>
                    <TableHead>Cuid</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Name</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users?.map(({ isActive, cuid, email, name }, index) => (
                    <TableRow key={cuid}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{isActive ? <Badge className="bg-emerald-400 hover:">Online</Badge> : <Badge className="bg-red-500">Offline</Badge>}</TableCell>
                        <TableCell>{cuid}</TableCell>
                        <TableCell>{email}</TableCell>
                        <TableCell>{name}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}