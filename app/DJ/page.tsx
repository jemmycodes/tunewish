import { cookies } from "next/headers"
import { IoAdd } from "react-icons/io5"
import RoomCard from "@/app/_components/ui/RoomCard"
import CustomDialog from "@/app/_components/ui/CustomDialog"
import { createSupabaseServerComponent } from "@/supabase/server"

const Rooms = async () => {
    const cookie = cookies()
    const supabase = createSupabaseServerComponent(cookie)

    const getUser = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
            throw new Error("An error occurred")
        }

        return user.id
    }

    const userID = await getUser()

    const { data: rooms, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("dj_id", userID)

    if (error) {
        throw new Error(error.message)
    }

    return (
        <>
            <section className="relative w-full space-y-4">
                <hgroup className="flex items-center justify-between gap-1">
                    <h3 className="text-xl font-bold">Rooms</h3>
                    <CustomDialog
                        trigger={
                            <>
                                <IoAdd className="mr-1 text-lg" />
                                Create Room
                            </>
                        }
                    />
                </hgroup>
                {rooms.length !== 0 ? (
                    <div className="flex w-full flex-col gap-4 mlg:grid mlg:grid-cols-2 lg:grid lg:grid-cols-dashboard_cards">
                        {rooms?.map((room, index) => (
                            <RoomCard
                                key={room.id}
                                name={room.name}
                                room_id={room.room_id}
                                description={room.description}
                                no_of_attendees={
                                    room.no_of_attendees || index * 2 + 3
                                }
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-lg">No Rooms Available!</p>
                )}
            </section>
        </>
    )
}

export default Rooms
