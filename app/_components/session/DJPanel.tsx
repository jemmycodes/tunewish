import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SessionTracks from "@/app/_components/session/SessionTracks"
import SessionRequests from "@/app/_components/session/SessionRequests"

const DJPanel = ({
    tracks,
    headerInfo,
}: {
    tracks: Track[]
    headerInfo: Record<string, string>
}) => {
    return (
        <Tabs defaultValue="Tracks" className="my-3 w-full">
            <TabsList>
                <TabsTrigger value="Tracks">Tracks</TabsTrigger>
                <TabsTrigger value="Requests">Requests</TabsTrigger>
            </TabsList>
            <SessionTracks tracks={tracks} />
            <SessionRequests image={headerInfo.url} />
        </Tabs>
    )
}

export default DJPanel
