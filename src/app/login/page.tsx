'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import img1 from "@/assets/Online world-bro.svg"
import img2 from "@/assets/brand communication-bro.svg"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useAuth } from "@/provider/user"
import { useRouter } from "next/navigation"

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export default function Login() {
    const router = useRouter()
    const { user, login, logout } = useAuth()
    const form = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema) })

    const submit = (data: any) => {
        login({ email: data.email, password: "admin" }).then(() => {
            router.push(`/dashboard`)
        })
    }

    return (
        <main className="h-screen w-full flex">
            <div className="bg-primary-foreground flex justify-center items-center h-full w-full p-16">
                <Carousel
                    className="flex justify-center items-center w-full">
                    <CarouselContent>
                        <CarouselItem>
                            <div className="flex aspect-square">
                                <Image src={img2} alt={""} />
                            </div>
                        </CarouselItem>
                        <CarouselItem>
                            <div className="flex aspect-square">
                                <Image src={img1} alt={""} />
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    {/* <CarouselNext /> */}
                    {/* <CarouselPrevious /> */}

                </Carousel>
            </div>
            <section className="flex items-center justify-center bg-primary max-w-3xl w-full h-full p-4 ">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold tracking-tighter">Entre com sua conta</CardTitle>
                        <CardDescription>Utilize seu email e senha para entrar</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="exemplo@email.com" />
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
                                                <Input {...field} placeholder="senha" type="password" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                        <Button onClick={form.handleSubmit(submit)} className="mt-6 w-full">Entrar</Button>

                    </CardContent>
                </Card>
            </section>
        </main>
    )
}