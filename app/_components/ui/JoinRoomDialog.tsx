"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { supabase } from "@/supabase/client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import useJoinRoom from "@/app/hooks/useJoinRoom"
import { useToast } from "@/components/ui/use-toast"

const JoinRoomDialog = ({ listener_id }: { listener_id: string }) => {
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const [roomID, setRoomID] = useState("")
    const [error, setError] = useState<string | null>(null)

    const { handleJoinRoom: joinRoom } = useJoinRoom({
        listener_id,
        room_id: roomID,
        is_active: true,
    })

    const handleJoinRoom = async () => {
        try {
            if (!roomID.trim()) return setError("Room ID is required")
            if (roomID.trim().length < 8) return setError("Room ID is invalid")
            setLoading(true)
            setError(null)
            const { data: room, error } = await supabase
                .from("rooms")
                .select("room_id")
                .eq("room_id", roomID.trim())
                .single()

            if (!room) {
                toast({
                    title: "Room not found",
                    description: "The room ID you entered is invalid",
                })
                return
            }
            if (error) {
                toast({
                    title: "An Error Occurred",
                    description: "An error occurred",
                })
                return
            }

            await joinRoom()
        } catch (error) {
            console.log(error, typeof error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 shadow transition-colors hover:bg-stone-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-50/90 dark:focus-visible:ring-stone-300">
                Join Room
            </DialogTrigger>
            <DialogContent className="flex w-full max-w-xs flex-col justify-center">
                <DialogHeader>
                    <DialogTitle>Enter Room ID</DialogTitle>
                    <DialogDescription>
                        Enter the room ID to join a room
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-1">
                    <label htmlFor="room-id" className="text-sm">
                        Room ID
                    </label>
                    <Input
                        type="text"
                        name="room-id"
                        value={roomID}
                        onChange={(e) => setRoomID(e.target.value)}
                    />
                    {error && <p className="text-xs text-red-500">{error}</p>}
                </div>
                <Button onClick={handleJoinRoom} disabled={loading}>
                    {loading ? "Joining Room" : "Join Room"}
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default JoinRoomDialog
