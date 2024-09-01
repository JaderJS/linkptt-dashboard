'use client'

import { api } from "@/axios"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import z from "zod"

const registerSchema = z.object({
    email: z.string().email(),
    nickname: z.string().min(3),
    confirmPassword: z.string().min(3),
    password: z.string().min(3)
})

interface User {
    cuid: string
    name: string
}

interface UserRegister {
    token: string
    user: User
}

async function register(body: z.infer<typeof registerSchema>): Promise<UserRegister> {
    const resp = await api.post(`/user/register`, body)
    return resp.data?.data
}

export default function Register() {

    const form = useForm<z.infer<typeof registerSchema>>({ resolver: zodResolver(registerSchema) })

    const { mutate, data: user } = useMutation(
        {
            mutationFn: (body: z.infer<typeof registerSchema>) => register(body)
        })

    const submit = (data: z.infer<typeof registerSchema>) => {
        mutate(data)
    }

    return (
        <main className="flex w-auto h-screen flex-col gap-2 justify-center items-center">
            <div className="border rounded-sm p-10">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submit)} className="space-y-4 w-96">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="nickname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Adicione seu nome</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirme sua senha</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button>Registar-se</Button>
                    </form>
                </Form>
            </div>

        </main>
    )
}