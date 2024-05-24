import { IoPeople } from "react-icons/io5"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const DJHome = () => {
    return (
        <>
            <section className="relative space-y-4">
                <hgroup className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold"> Rooms Overview</h3>
                </hgroup>
                <div className="flex flex-wrap gap-4">
                    <OverviewRoomCard title="Room 1" no_of_attendees={5} />
                </div>
            </section>
        </>
    )
}

export default DJHome

interface OverviewRoomCardProps {
    title: string
    no_of_attendees: number
}

const OverviewRoomCard = ({
    title,
    no_of_attendees,
}: OverviewRoomCardProps) => {
    return (
        <Card className="  flex w-full max-w-60 flex-col justify-between backdrop-blur-md dark:bg-stone-800/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent className="">
                <span className="flex items-center gap-2">
                    <IoPeople />
                    <p className="text-sm">{no_of_attendees}</p>
                </span>
            </CardContent>
        </Card>
    )
}
