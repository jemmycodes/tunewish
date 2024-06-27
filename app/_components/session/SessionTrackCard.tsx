import Image from "next/image"
import { FaPlay } from "react-icons/fa"
import { Button } from "@/components/ui/button"

const SessionTrackCard = ({ track }: { track: Track }) => {
    return (
        <div
            className="w-full cursor-pointer rounded-md bg-stone-950 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-stone-950/30 "
            key={track.id}
        >
            <Image
                src={track.images[0]}
                alt={track.id}
                width={200}
                height={200}
                className="aspect-video h-36 w-full rounded-t-md   object-cover object-center"
            />
            <div className="flex w-full items-center justify-between p-4">
                <hgroup className="w-[75%]">
                    <h2 className="text-sm ">{track.name}</h2>
                    <h3 className="text-xs text-stone-400">
                        {track.artists.map((artist) => artist.name).join(", ")}
                    </h3>
                </hgroup>
                <Button
                    size="icon"
                    className=" rounded-full bg-green-700 dark:bg-green-700 "
                >
                    <FaPlay />
                </Button>
            </div>
        </div>
    )
}

export default SessionTrackCard
