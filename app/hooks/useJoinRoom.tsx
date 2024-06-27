import { supabase } from "@/supabase/client"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { checkIfListenerInRoom } from "@/utils/functions"

const useJoinRoom = (roomData: {
    room_id: string
    is_active: true
    listener_id: string | undefined
}) => {
    const { toast } = useToast()
    const router = useRouter()
    const [formState, setFormState] = useState<FormState>("idle")

    const handleJoinRoom = async () => {
        setFormState("loading")

        toast({
            title: "Joining room",
            description: "Please wait...",
        })

        // check if user is in room already
        const message = await checkIfListenerInRoom({
            listener_id: roomData.listener_id!,
            room_id: roomData.room_id,
        })

        if (message) {
            if (message.status === 404) {
                const { status, ...error } = message
                toast(error)
                return
            }

            toast(message)
            router.replace(`/rooms/${roomData.room_id}/session`)
            return
        }

        const { error } = await supabase
            .from("listeners_room")
            .insert([roomData])

        console.log(error)
        if (error) {
            setFormState("error")
            toast({
                title: "Error joining room",
                description: "Please try again",
            })
            return "error"
        }

        setFormState("success")
        toast({
            title: "Room joined",
            description: "You have successfully joined the room",
        })
        router.push(`/rooms/${roomData.room_id}/session`)
    }

    return { formState, handleJoinRoom }
}

export default useJoinRoom
