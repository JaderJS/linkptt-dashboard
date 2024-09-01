'use client'

import { useMutation } from "@tanstack/react-query"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import z from "zod"
import { createChannel } from "@/functions/channels"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { useState } from "react"
import { Button } from "../ui/button"
import { toast } from "sonner"

const createChannelSchema = z.object({
    name: z.string().min(5),
    profileUrl: z.string().url(),
    ownerCuid: z.string().cuid()
})

export const UpsertChannelComponent = ({ channel }: { channel?: any }) => {
    const [open, setOpen] = useState<boolean>(false)
    const { data: upsertChannel, mutateAsync: createChannelMutate } = useMutation({
        mutationFn: createChannel
    })

    const form = useForm<z.infer<typeof createChannelSchema>>({
        resolver: zodResolver(createChannelSchema),
        defaultValues: {
            ownerCuid: "cm0fm4ilg0000tjjqy1jj15je"
        }
    })

    const submit = (data: z.infer<typeof createChannelSchema>) => {
        createChannelMutate(data).then((resp) => {
            console.log(resp)
            setOpen(false)
        }).catch((error) => {
            toast(`@api - `, error.message)
        })
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            {!channel ? <AlertDialogTrigger asChild>
                <Button>Open</Button>
            </AlertDialogTrigger> : <AlertDialogTrigger>
                <Button>Edit</Button>
            </AlertDialogTrigger>}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle></AlertDialogTitle>
                    <AlertDialogDescription></AlertDialogDescription>
                </AlertDialogHeader>

                <Form {...form}>
                    <form>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome do canal</FormLabel>
                                    <FormControl>
                                        <Input{...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="profileUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome do canal</FormLabel>
                                    <FormControl>
                                        <Input{...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>

                <AlertDialogFooter>
                    <AlertDialogAction onClick={form.handleSubmit(submit)}>Continue</AlertDialogAction>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}