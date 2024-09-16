'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createOneTokenAccess } from "@/functions/channels"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"

export default function Wrench() {
    return (
        <>
            <GenerateTokenAccess />
        </>
    )
}

const GenerateTokenAccess = () => {
    const { mutate, data } = useMutation({
        mutationFn: createOneTokenAccess
    })

    const loginSchema = z.object({
        email: z.string().email(),
        password: z.string().min(3)
    })

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (data: z.infer<typeof loginSchema>) => {
        mutate({ email: data.email, password: data.password })
    }

    return (
        <main className="flex justify-center items-center">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>Token</CardTitle>
                    <CardDescription>Gere o token para acesso no linkptt-node</CardDescription>
                </CardHeader>
                <CardContent>

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
                            <Textarea value={data?.token} className="w-full" />

                            <Button type="submit" className="w-full">Novo Token</Button>
                        </form>
                    </Form>
                </CardContent>

            </Card>

        </main>
    )
}