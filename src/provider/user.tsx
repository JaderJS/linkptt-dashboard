'use client'

import { lifeServer } from "@/functions/global"
import { loginUser } from "@/functions/users"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createContext, ReactNode, useContext, useRef, useState } from "react"
import { toast } from "sonner"

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

    const [user, setUser] = useState<UserProps | undefined>(undefined)
    const { isSuccess } = useQuery({ queryKey: [`life-server`], queryFn: lifeServer })
    const { mutateAsync: login_ } = useMutation({ mutationFn: async (body: { email: string, password: string }) => loginUser(body) })

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
            return user_
        } catch (error: any) {
            toast(error.response?.data?.msg || "Ocorreu um erro")
        }
    }

    const logout = () => { }

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
            <p>Serviço indisponivel</p>
        </main>
    )
}