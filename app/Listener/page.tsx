import { cookies } from "next/headers"
import { PostgrestError } from "@supabase/supabase-js"
import ListenerRoom from "@/app/_components/ui/ListenerRoom"
import { createSupabaseServerComponent } from "@/supabase/server"

interface ListenerProps {
    data: ListenerRoomProps[] | null
    error: PostgrestError | null
}

const Listener = async () => {
    const cookie = cookies()
    const supabase = createSupabaseServerComponent(cookie)

    const { data, error }: ListenerProps = await supabase
        .from("listeners_room")
        .select(
            `
    *, rooms(*)
    `,
        )

    if (error) {
        console.error(error)
        return <div>Something went wrong!</div>
    }

    if (data && data.length === 0) {
        return <div>No rooms available</div>
    }

    return (
        <section className="flex w-full flex-col gap-4 mlg:grid mlg:grid-cols-2 lg:grid lg:grid-cols-dashboard_cards">
            {data?.map((listener) => {
                const { rooms }: RoomType = listener
                return (
                    <ListenerRoom
                        key={listener.id}
                        name={rooms.name}
                        no_of_attendees={0}
                        dj_id={rooms.dj_id}
                        status={rooms.status}
                        room_id={rooms.room_id}
                        description={rooms.description}
                    />
                )
            })}
        </section>
    )
}

export default Listener
