import Image from "next/image"
import { FaPlay } from "react-icons/fa"
import { Button } from "@/components/ui/button"

const SessionSearchList = ({ track }: { track: Track }) => {
    return (
        <li
            key={track.id}
            className="gap flex w-full items-center justify-between border-b border-stone-700 p-4"
        >
            <div className="flex gap-3">
                <Image
                    src={track.images[0]}
                    alt={track.name}
                    width={50}
                    height={50}
                    className="aspect-square h-[50px] w-[50px] object-cover"
                />
                <hgroup>
                    <h2 className="text-sm ">{track.name.split("(")[0]}</h2>
                    <h3 className="text-xs text-stone-400">
                        {track.artists.map((artist) => artist.name).join(", ")}
                    </h3>
                </hgroup>
            </div>
            <Button
                size="icon"
                className=" rounded-full bg-green-700 dark:bg-green-700 "
            >
                <FaPlay />
            </Button>
        </li>
    )
}

export default SessionSearchList
