import { ReactNode } from "react"
import { cookies } from "next/headers"
import { IoPeople } from "react-icons/io5"
import { GiClothes } from "react-icons/gi"
import {
    RoomDetailButtonDJ,
    RoomDetailButtonListener,
} from "@/app/_components/ui/RoomDetailButton"
import { Badge } from "@/components/ui/badge"
import { AiFillMessage } from "react-icons/ai"
import { FaLocationDot } from "react-icons/fa6"
import { createSupabaseServerComponent } from "@/supabase/server"

const RoomDetails = async ({ params }: { params: Record<string, string> }) => {
    const cookie = cookies()

    const supabase = createSupabaseServerComponent(cookie)

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const role = user?.user_metadata.role

    const { data: room, error } = await supabase
        .from("rooms")
        .select(
            `
    *,
    dj (
      username, dj_id
    )
  `,
        )
        .eq("room_id", params.slug)
        .single()

    console.log(room)

    if (error) {
        if (error?.code === "22P02") {
            throw new Error(" Room does not exist or might have been deleted")
        }
        throw new Error(
            "An Error occurred, check your connection, refresh the page or try again later",
        )
    }

    return (
        <>
            <header className="flex h-[50vh] w-screen flex-col justify-end  bg-[url('/dj-deck.jpg')] bg-cover bg-center px-4 py-2 ">
                <hgroup className="lg:ml-60">
                    <h1 className="-mt-5 text-3xl font-semibold">
                        {room.name}
                    </h1>
                    {room.dj?.username && (
                        <h2 className="text-sm text-stone-400">
                            Created by {room.dj?.username}
                        </h2>
                    )}
                </hgroup>
            </header>
            <main className="mx-auto max-w-3xl space-y-6 p-4">
                <Badge variant="outline">
                    <span
                        className={`p-1 ${room.status === "Pending" ? "bg-orange-600" : room.status === "in session" ? "bg-green-600" : "bg-red-600"} mr-2  rounded-full`}
                    ></span>
                    <p className="capitalize">{room.status}</p>
                </Badge>
                <p className="text-sm text-stone-400">{room.description}</p>
                <ul className="space-y-3">
                    <h3 className="font-medium uppercase">Room Details</h3>
                    <RoomDetail icon={<GiClothes />} detail={room.dress_code} />
                    <RoomDetail
                        icon={<FaLocationDot />}
                        detail={room.location}
                    />
                    <RoomDetail
                        icon={<AiFillMessage />}
                        detail={room.message}
                    />
                    <RoomDetail
                        icon={<IoPeople />}
                        detail={room.no_of_attendees?.toString()}
                    />
                </ul>

                {role === "Listener" ? (
                    <RoomDetailButtonListener
                        listener_id={user.id}
                        room_id={room.room_id}
                    />
                ) : (
                    <RoomDetailButtonDJ
                        room_id={room.room_id}
                        status={room.status}
                        dj_id={room.dj_id}
                    />
                )}
            </main>
        </>
    )
}

export default RoomDetails

interface RoomDetailProps {
    icon: ReactNode
    detail: string
}

const RoomDetail = ({ icon, detail }: RoomDetailProps) => {
    return (
        detail && (
            <li className="flex items-center gap-2 text-stone-400">
                <span>{icon}</span>
                <p className="text-sm ">{detail}</p>
            </li>
        )
    )
}
