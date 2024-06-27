import { useState } from "react"
import { supabase } from "@/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

const useHandleStartRoom = ({ dj_id, room_id }: Record<string, string>) => {
    const { toast } = useToast()
    const router = useRouter()
    const [formState, setFormState] = useState<FormState>("idle")

    const handleStartRoom = async () => {
        setFormState("loading")

        toast({
            title: "Starting session",
            description: "Please wait...",
        })

        const { error } = await supabase
            .from("rooms")
            .update({
                status: "in session",
            })
            .eq("dj_id", dj_id)

        if (error) {
            setFormState("error")
            toast({
                title: error.message,
                description: "Please try again",
            })
            return
        }

        setFormState("success")
        toast({
            title: "Room started!",
            description: "Redirecting...",
        })
        router.replace(`/rooms/${room_id}/session`)
    }

    return { handleStartRoom, formState }
}

export default useHandleStartRoom
