"use client"

import { useState } from "react"
import { supabase } from "@/supabase/client"
import { FaArrowRight } from "react-icons/fa6"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { ReloadIcon } from "@radix-ui/react-icons"

interface RoomDetailButtonProps {
    role: Roles
    text: string
    room_id: string
    listener_id: string
}

const RoomDetailButton = ({
    role,
    text,
    room_id,
    listener_id,
}: RoomDetailButtonProps) => {
    const { toast } = useToast()
    const [formState, setFormState] = useState<FormState>("idle")

    const handleJoinRoom = async () => {
        setFormState("loading")

        toast({
            title: "Joining room",
            description: "Please wait...",
        })

        const { error } = await supabase.from("listeners_room").insert([
            {
                listener_id,
                room_id,
                is_active: true,
            },
        ])

        if (error) {
            setFormState("error")
            toast({
                title: "Error joining room",
                description: "Please try again",
            })
            return
        }

        setFormState("success")
        toast({
            title: "Room joined",
            description: "You have successfully joined the room",
        })
    }

    const handleStartRoom = () => {
        console.log("Starting room")
    }

    return role === "DJ" ? (
        <Button onClick={handleStartRoom} disabled={formState === "loading"}>
            {formState === "loading" ? (
                <>
                    Joining Room
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                </>
            ) : (
                <>
                    {text}
                    <FaArrowRight className="ml-2" />
                </>
            )}
        </Button>
    ) : (
        <Button onClick={handleJoinRoom} disabled={formState === "loading"}>
            {formState === "loading" ? (
                <>
                    Starting Session
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                </>
            ) : (
                <>
                    {text}
                    <FaArrowRight className="ml-2" />
                </>
            )}
        </Button>
    )
}

export default RoomDetailButton
