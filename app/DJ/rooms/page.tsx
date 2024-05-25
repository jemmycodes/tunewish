import { IoAdd } from "react-icons/io5"
import RoomCard from "@/app/_components/ui/RoomCard"
import { supabaseServerClient } from "@/supabase/server"
import CustomDialog from "@/app/_components/ui/CustomDialog"

const Rooms = async () => {
    const supabase = supabaseServerClient()

    const { data: rooms, error } = await supabase.from("rooms").select("*")

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
