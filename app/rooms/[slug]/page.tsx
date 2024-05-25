import { supabase } from "@/supabase/client"

interface RoomDetailsProps {
    params: {
        slug: string
    }
}

const RoomDetails = async ({ params }: RoomDetailsProps) => {
    const { data: room, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("room_id", params.slug)
        .single()

    if (error) {
        if (error?.code === "22P02") {
            return <p>Room does not exist or might have been deleted.</p>
        }
        return <p> An Error occurred</p>
    }

    return (
        <>
            <header className="flex h-[60vh] w-screen flex-col justify-end  bg-[url('/dj-deck.jpg')] bg-cover bg-center px-4 py-2 ">
                <hgroup className="lg:ml-60">
                    <h1 className="-mt-5 text-3xl font-semibold">
                        {room.name}
                    </h1>
                    <h2>DJ Jemmy</h2>
                </hgroup>
            </header>
            <main className="mx-auto max-w-3xl p-4">
                <p>{room.description}</p>
            </main>
        </>
    )
}

export default RoomDetails
