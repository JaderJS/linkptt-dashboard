'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"
import { AuthProvider } from "./user"
import { NavBar } from "@/components/my/navbar"
import { usePathname } from "next/navigation"
import { APP_ROUTES_WITHOUT_NAVBAR } from "@/app/constants/app-routes-navbar"

export default function Provider({ children }: { children: ReactNode }) {

    const pathname = usePathname()
    const [queryClient] = useState(() => new QueryClient())
    const withNavbar = !APP_ROUTES_WITHOUT_NAVBAR.includes(pathname)

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                {withNavbar && <NavBar />}
                {children}
            </AuthProvider>
        </QueryClientProvider>
    )
}