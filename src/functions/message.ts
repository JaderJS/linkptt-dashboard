import { api } from "@/axios";

export async function deleteMessage(id: number) {
    const resp = await api.delete(`/message/${id}`)
    return resp.data
}