'use client'

import { lifeServer } from "@/functions/global"
import { loginUser, myUser } from "@/functions/users"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createContext, ReactNode, useContext, useRef, useState } from "react"
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type UserProps = {
    cuid: string
    email: string
    name: string
    avatarUrl: string
}
type AuthProps = {
    user?: UserProps
    login: ({ email, password }: { email: string, password: string }) => Promise<UserProps | undefined>
    logout: Function
    isAuth: boolean
}

const AuthContext = createContext<AuthProps>({} as AuthProps)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter()
    const token = getCookie(`linkptt-dashboard`) as string
    const { isSuccess } = useQuery({ queryKey: [`life-server`], queryFn: lifeServer })
    const { data: user_ } = useQuery({
        enabled: !!token,
        queryKey: [`myUser`, token],
        queryFn: () => myUser(token),
        select: (data) => setUser(data.user)
    })
    const [user, setUser] = useState<UserProps | undefined>(undefined)
    const { mutateAsync: login_ } = useMutation({ mutationFn: (body: { email: string, password: string }) => loginUser(body) })

    const login = async ({ email, password }: { email: string, password: string }): Promise<UserProps | undefined> => {
        try {
            const { data } = await login_({ email, password })
            const user_: UserProps = {
                cuid: data.user.cuid,
                email: data.user.email,
                name: data.user.name,
                avatarUrl: data.user.avatarUrl
            }
            setUser(user_)
            setCookie('linkptt-dashboard', data.token)
            router.push(`/dashboard/channels`)
            return user_
        } catch (error: any) {
            console.error(error)
            toast(error.response?.data?.msg || "Ocorreu um erro")
        }
    }

    const logout = () => {
        deleteCookie(`linkptt-dashboard`)
        router.push(`/login`)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuth: !!user }}>
            {isSuccess ? children : <NotOnline />}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}

const NotOnline = () => {
    return (
        <main className="h-screen w-full flex justify-center items-center">
            <p>Serviço indisponível</p>
        </main>
    )
}