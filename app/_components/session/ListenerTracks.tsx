import Image from "next/image"
import { Button } from "@/components/ui/button"

const ListenerTracks = ({ images, artists, name }: Track) => {
    return (
        <div className="flex items-stretch gap-3 rounded-md bg-stone-950">
            <Image
                src={images[0]}
                alt="track"
                width={100}
                height={100}
                className="aspect-auto  w-[30%] max-w-[9rem] rounded-l-md object-cover"
            />
            <div className="flex w-full flex-col justify-between gap-4  px-2 py-3">
                <section className="flex flex-col gap-1 ">
                    <p className="text-sm text-stone-400">
                        Name: <span className="text-stone-200">{name}</span>
                    </p>
                    <p className="text-sm text-stone-400">
                        {artists.length > 1 ? "Artists" : "Artist"}:{" "}
                        <span className="text-stone-200">
                            {artists.map((artist) => artist.name).join(", ")}
                        </span>
                    </p>
                </section>
                <Button className="w-full">Request</Button>
            </div>
        </div>
    )
    return
}

export default ListenerTracks
