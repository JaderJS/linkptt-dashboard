import { MenuIcon, MountainIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "../ui/sheet"
import { Menubar, MenubarMenu, MenubarTrigger, MenubarItem } from "../ui/menubar"
import { MenubarContent, MenubarSeparator } from "@radix-ui/react-menubar"
import Link from "next/link"
import { useAuth } from "@/provider/user"

export const NavBar = () => {

    const { logout } = useAuth()

    return (

        <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
            <Sheet>
                <SheetTitle></SheetTitle>
                <SheetDescription></SheetDescription>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <MenuIcon className="h-6 w-6" />
                        <span className="sr-only">Toggle menu navigation</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
                        <MountainIcon className="h-6 w-6" />
                        <span className="sr-only">LinkPTT</span>
                    </Link>
                    <div className="grid gap-2 py-6">
                        <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                            Home
                        </Link>
                    </div>
                </SheetContent>
            </Sheet>
            <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
                <MountainIcon className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
            </Link>
            <nav className="ml-auto hidden lg:flex gap-6">
                <Link
                    href="/dashboard"
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                    prefetch={false}
                >
                    Dashboard
                </Link>
                <Link
                    href="/dashboard/channels"
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                    prefetch={false}
                >
                    Canais
                </Link>
                <Link
                    href="/wrench"
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                    prefetch={false}
                >
                    Ferramentas
                </Link>
                <Menubar className="border-0">
                    <MenubarMenu>
                        <MenubarTrigger>Perfil</MenubarTrigger>
                        <MenubarContent>
                            <MenubarSeparator />
                            <MenubarItem onClick={() => logout()}> Logout</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>

            </nav>
        </header >
    )

}