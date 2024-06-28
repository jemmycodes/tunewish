import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ListenerTracks from "@/app/_components/session/ListenerTracks"

const ListenerPanel = ({ tracks }: { tracks: Track[] }) => {
    return (
        <Tabs defaultValue="Tracks" className="my-3 w-full">
            <TabsList>
                <TabsTrigger value="Tracks">Tracks</TabsTrigger>
                <TabsTrigger value="Requests">Queue</TabsTrigger>
            </TabsList>
            <section className="my-5 flex flex-col  justify-between gap-5 2xsm:grid 2xsm:grid-cols-request_cards ">
                {tracks.map((track) => (
                    <ListenerTracks key={track.id} {...track} />
                ))}
            </section>
        </Tabs>
    )
}

export default ListenerPanel
