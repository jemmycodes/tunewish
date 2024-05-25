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
import { useRouter } from "next/navigation"
import { supabase } from "@/supabase/client"
import { useCreateQRCode } from "@/app/hooks"
import { toast as sonnerToast } from "sonner"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { MdDelete } from "react-icons/md"
import { IoPeople, IoShareSocialSharp, IoCopyOutline } from "react-icons/io5"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

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
    const router = useRouter()
    const QRCode = useCreateQRCode(room_id)

    const roomLink = `${location.origin}/rooms/${room_id}`

    const handleCopyRoomLink = async () => {
        ;(!navigator.clipboard ||
            !navigator.clipboard.writeText ||
            !navigator) &&
            sonnerToast.error("Cannot copy room link!")

        await navigator.clipboard
            .writeText(roomLink)
            .then(() => sonnerToast.success("Copied!"))
            .catch(() => sonnerToast.error("Cannot copy room link!"))
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
                <Dialog>
                    <DialogTrigger className="rounded-lg border border-stone-800 bg-stone-950 p-2 hover:bg-stone-800 hover:text-stone-50">
                        <IoShareSocialSharp />
                    </DialogTrigger>
                    <DialogContent className="flex w-full flex-col items-center justify-center gap-2">
                        <DialogHeader className="text-center text-lg">
                            <DialogTitle className="text-center">
                                Share Room
                            </DialogTitle>
                            <DialogDescription className="text-center text-xs">
                                Invite your family and friends to your room
                            </DialogDescription>
                        </DialogHeader>
                        <div className="w-full max-w-48">{QRCode}</div>
                        <p className="text-center">OR</p>
                        <div className="flex flex-col gap-2">
                            <p className="text-xs">Copy Room Link</p>
                            <span className="flex flex-col gap-4">
                                <code className="text-wrap rounded-lg bg-stone-900 p-3 text-sm">
                                    {roomLink}
                                </code>
                                <Button onClick={handleCopyRoomLink}>
                                    <IoCopyOutline className="mr-4" /> Copy Room
                                    Link
                                </Button>
                            </span>
                        </div>
                        <DialogFooter></DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
        // </Link>
    )
}

export default RoomCard
