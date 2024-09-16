'use client'
import { Button } from "@/components/ui/button"
import { uploadImage } from "@/functions/global"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { UploadIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ChangeEvent, useRef } from "react"
import { useForm } from "react-hook-form"

interface ImageUploaderProps {
    onUpdate?: (pathUrl: string) => void
    enable?: boolean
    src?: string
}

const PROFILE_URL = ""

export const ImageUploader = ({ onUpdate, enable, src = PROFILE_URL }: ImageUploaderProps) => {
    const { mutateAsync: uploadImageMutate, data: upload } = useMutation({ mutationFn: (body: any) => uploadImage(body) })

    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files?.[0]) {
            return
        }
        const formData = new FormData()
        formData.append("image", event.target.files[0])
        uploadImageMutate(formData).then((resp) => {
            console.log(resp)
            onUpdate?.(resp.image.pathUrl)
        })
    }

    console.log("IMAGE", src)

    return (
        <div className="relative">
            <Image
                src={src}
                alt="Foto de perfil"
                width={300}
                height={300}
                className="rounded-full border-2"
            />
            {<Button
                size="icon"
                variant="outline"
                onClick={() => { inputRef.current?.click() }}
                className="absolute bottom-0 left-8 rounded-full"
            >
                <UploadIcon className=" h-6 w-6" />
            </Button>}
            <input ref={inputRef} className="hidden" type="file" accept="image/*" onChange={handleFileChange} />
        </div>
    )
}

