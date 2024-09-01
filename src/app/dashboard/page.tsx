'use client'

import { api } from "@/axios"
import { ChannelsComponents } from "@/components/my/channels"
import { UserComponents } from "@/components/my/users"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChannelProps, getChannels } from "@/functions/channels"
import { activedUsers } from "@/functions/users"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import z from "zod"

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1)
})

export default function Dashboard() {

    const { mutate, data, isSuccess } = useMutation({
        mutationFn: async (body: { email: string, password: string }) => {
            const resp = await api.post(`/user/login`, body)
            return resp.data?.data
        },
        // onSuccess: (data) => console.log(data.data)
    })

    const { data: users } = useQuery({ queryKey: ['actived-users'], queryFn: activedUsers })
    const { data: channels } = useQuery({ queryKey: ['channels'], queryFn: getChannels })

    const form = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema) })

    const onSubmit = (data: z.infer<typeof loginSchema>) => {
        mutate({ email: data.email, password: data.password })
    }

    return (
        <main className="flex w-auto h-screen justify-center items-center flex-col gap-4">

            <UserComponents users={users} />
            <ChannelsComponents channels={channels} users={users} />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <Button type="submit">New Token</Button>
                </form>
            </Form>

            <Textarea value={data?.token} className="w-1/2" />
        </main>
    )
}