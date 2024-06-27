import { TabsContent } from "@/components/ui/tabs"
import SessionTrackCard from "@/app/_components/session/SessionTrackCard"

const SessionTracks = ({ tracks }: { tracks: Track[] }) => {
    return (
        <TabsContent value="Tracks">
            <section className="my-5 flex flex-col  justify-between gap-5 2xsm:grid 2xsm:grid-cols-session_cards ">
                {tracks.map((track: Track) => (
                    <SessionTrackCard track={track} key={track.id} />
                ))}
            </section>
        </TabsContent>
    )
}

export default SessionTracks
