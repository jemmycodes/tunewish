"use client"

import Link from "next/link"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { MdDelete, MdCheck, MdOutlineError } from "react-icons/md"
import { useRouter } from "next/navigation"
import { supabase } from "@/supabase/client"
import { useCreateQRCode } from "@/app/hooks"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { IoPeople, IoShareSocialSharp, IoCopyOutline } from "react-icons/io5"
import { Simulate } from "react-dom/test-utils"
import copy = Simulate.copy

interface RoomCardProps {
    name: string
    room_id: string
    description: string
    no_of_attendees: number
}

const RoomCard = ({
    name,
    room_id,
    description,
    no_of_attendees,
}: RoomCardProps) => {
    const { toast } = useToast()
    const [copyMessage, setCopyMessage] = useState<string | null>(null)
    const router = useRouter()
    const QRCode = useCreateQRCode(room_id)

    const roomLink = `${location.origin}/rooms/${room_id}`

    const handleCopyRoomLink = async () => {
        if (
            !navigator.clipboard ||
            !navigator.clipboard.writeText ||
            !navigator
        ) {
            setCopyMessage("Error!")
            return
        }

        await navigator.clipboard
            .writeText(roomLink)
            .then(() => setCopyMessage("Copied!"))
            .catch(() => setCopyMessage("Error!"))
    }

    const handleDeleteRoom = async () => {
        toast({
            title: `Deleting Room: ${name}`,
            description: "Please wait...",
        })

        const { error } = await supabase
            .from("rooms")
            .delete()
            .eq("room_id", room_id)

        if (error) {
            toast({
                title: `Cannot delete Room: ${name}!`,
                description: error.message,
            })
            return
        }

        toast({
            title: `Room ${name} Deleted!`,
            description: `${name} has been successfully deleted`,
        })
        router.refresh()
    }

    return (
        <Card className="relative w-full">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-2"
                >
                    <MdDelete onClick={handleDeleteRoom} />
                </Button>
            </CardHeader>

            <CardContent className="flex  gap-2">
                <CardDescription className="flex flex-col gap-3">
                    <p className="line-clamp-3">{description}</p>
                    <Link
                        href={`/rooms/${room_id}`}
                        className=" text-stone-100 underline"
                    >
                        View More
                    </Link>
                </CardDescription>
            </CardContent>
            <CardFooter className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-1">
                    <IoPeople />
                    <p className="text-sm">{no_of_attendees}</p>
                </span>
                <Popover>
                    <PopoverTrigger className="rounded-lg border border-stone-800 bg-stone-950 p-2 hover:bg-stone-800 hover:text-stone-50">
                        <IoShareSocialSharp />
                    </PopoverTrigger>
                    <PopoverContent className="flex w-full flex-col items-center justify-center gap-2">
                        <p className="text-center text-lg">Scan Code</p>
                        <div className="w-full max-w-48">{QRCode}</div>
                        <p className="text-center">OR</p>
                        <div className="flex flex-col gap-3">
                            <p>Room Link</p>
                            <span className="space-x-2">
                                <Link
                                    className="text-wrap rounded-lg bg-stone-900 p-3 text-sm"
                                    href={roomLink}
                                >
                                    {roomLink}
                                </Link>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={handleCopyRoomLink}
                                >
                                    {copyMessage === "Copied!" && <MdCheck />}
                                    {copyMessage === "Error!" && (
                                        <MdOutlineError />
                                    )}

                                    {!copyMessage && <IoCopyOutline />}
                                </Button>
                            </span>
                        </div>
                    </PopoverContent>
                </Popover>
            </CardFooter>
        </Card>
        // </Link>
    )
}

export default RoomCard
