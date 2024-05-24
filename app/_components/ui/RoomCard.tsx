"use client"

// import Link from "next/link"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { MdDelete } from "react-icons/md"
import { IoPeople } from "react-icons/io5"
import { useRouter } from "next/navigation"
import { supabase } from "@/supabase/client"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

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
    const router = useRouter()
    const { toast } = useToast()
    const handleDeleteRoom = async () => {
        toast({
            title: `Deleting Room: ${name}`,
            description: "Please wait...",
        })

        const { error } = await supabase
            .from("rooms")
            .delete()
            .eq("room_id", room_id)

        console.log(error)

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
        // <Link href={`/DJ/room/${room_id}`}>
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

            <CardContent className="flex  gap-3">
                <CardDescription className="line-clamp-3">
                    {description}
                </CardDescription>
            </CardContent>
            <CardFooter className="flex gap-3">
                <span className="flex items-center gap-1">
                    <IoPeople />
                    <p className="text-sm">{no_of_attendees}</p>
                </span>
            </CardFooter>
        </Card>
        // </Link>
    )
}

export default RoomCard
