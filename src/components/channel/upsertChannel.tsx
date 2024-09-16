'use client'
import { Button } from "../ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { useMutation } from "@tanstack/react-query"
import { createOneChannel } from "@/functions/channels"
import { useAuth } from "@/provider/user"
import { toast } from "sonner"

export const UpsertChannelComponent = () => {
    const { user } = useAuth()
    const upsertChannelSchema = z.object({
        name: z.string().min(5),
        password: z.string().min(5),
        profileUrl: z.string().url()
    })

    const form = useForm<z.infer<typeof upsertChannelSchema>>({
        resolver: zodResolver(upsertChannelSchema), defaultValues: {
            name: "",
            password: "",
            profileUrl: "http://localhost:5051/linkptt/Frase%20Instagram.png"
        }
    })

    const { mutateAsync: createOneChannelMutate } = useMutation({ mutationFn: createOneChannel })

    const submit = ({ name, password, profileUrl }: z.infer<typeof upsertChannelSchema>) => {
        createOneChannelMutate({ name, password, profileUrl }).then(resp => console.log(resp)).catch((error) => {
            toast(error?.response?.data?.msg || error?.response?.data?.message || "Ops! Algo deu errado...")
        })
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="w-full">Novo canal</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Novo canal</AlertDialogTitle>
                        <AlertDialogDescription>Crie um canal para chamar de seu!</AlertDialogDescription>
                    </AlertDialogHeader>
                    <Form {...form} >
                        <form>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome do canal</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="meu canal" />
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
                                        <FormLabel>Senha do canal</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="s3nha mu1t0 s3gur@" type="password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>

                    <AlertDialogFooter>
                        <AlertDialogAction onClick={form.handleSubmit(submit)}>Criar</AlertDialogAction>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}