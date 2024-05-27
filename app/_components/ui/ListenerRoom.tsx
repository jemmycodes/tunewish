import Link from "next/link"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IoPeople } from "react-icons/io5"

interface ListenerRoomProps {
    name: string
    dj_id: string
    room_id: string
    status: RoomStatus
    description: string
    no_of_attendees: number
}

const ListenerRoom = async ({
    name,
    dj_id,
    status,
    room_id,
    description,
    no_of_attendees,
}: ListenerRoomProps) => {
    return (
        <Card className="relative w-full">
            <CardHeader className=" flex-row items-center justify-between">
                <CardTitle>{name}</CardTitle>
                <Badge variant="outline">
                    <span
                        className={`p-1 ${status === "pending" ? "bg-orange-600" : status === "in session" ? "bg-green-600" : "bg-red-600"} mr-2  rounded-full`}
                    ></span>

                    <p className="capitalize">{status}</p>
                </Badge>
            </CardHeader>

            <CardContent className="flex  gap-2">
                <p className="line-clamp-3  text-sm text-stone-400">
                    {description}
                </p>
            </CardContent>
            <CardFooter className="flex items-center justify-between gap-3 text-sm">
                <span className="flex items-center gap-1">
                    <IoPeople />
                    <p>{Math.round(Math.random() * 10)}</p>
                </span>
                <Link href={`/rooms/${room_id}`} className=" text-stone-100 ">
                    View Room
                </Link>
                <Link href={`/rooms/${room_id}`} className=" text-stone-100 ">
                    Join Room
                </Link>
            </CardFooter>
        </Card>
    )
}

export default ListenerRoom
