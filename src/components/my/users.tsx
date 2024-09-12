import { ActiveUsersProps } from "@/functions/users"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

export const UserComponents = ({ users }: { users?: ActiveUsersProps[] }) => {
    return (
        <Table className="">
            <TableCaption>Lista com os usuários</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>*</TableHead>
                    <TableHead>Actived?</TableHead>
                    <TableHead>Cuid</TableHead>
                    <TableHead>email</TableHead>
                    <TableHead>name</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users?.map(({ isActive, cuid, email, name }, index) => (
                    <TableRow key={cuid}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{isActive ? "Online" : "Offline"}</TableCell>
                        <TableCell>{cuid}</TableCell>
                        <TableCell>{email}</TableCell>
                        <TableCell>{name}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}