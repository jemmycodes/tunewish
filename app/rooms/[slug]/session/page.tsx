import Image from "next/image"
import { BASE_URL } from "@/utils/functions"
import RoleParams from "@/app/_layouts/RoleParams"
import DJPanel from "@/app/_components/session/DJPanel"
import SessionSearch from "@/app/_components/session/SessionSearch"
import ListenerPanel from "@/app/_components/session/ListenerPanel"

const Session = async ({ searchParams }: Record<string, URLSearchParams>) => {
    const res = await fetch(`${BASE_URL}/api/spotify/get-tracks`)
    const tracks = await res.json()

    const randomNumber = Math.round(Math.random() * tracks.length - 1)

    const headerInfo = {
        artists: tracks[randomNumber].artists
            .map((artist: { name: string; id: string }) => artist.name)
            .join(", "),
        track: tracks[randomNumber].name,
        url: tracks[randomNumber].images[0],
    }

    const role = new URLSearchParams(searchParams).get("role")

    return (
        <RoleParams>
            <header
                className={`relative flex h-[50vh] w-screen flex-col   justify-end bg-cover bg-center`}
            >
                <Image
                    width={1920}
                    height={1080}
                    priority={true}
                    src={headerInfo.url}
                    alt={headerInfo.track}
                    className="absolute -z-10 h-[50vh] w-screen object-cover"
                />
                <div className="absolute -z-10 h-[50vh] w-screen bg-black/50"></div>
                <hgroup className="px-4 py-2 ">
                    <h1 className="text-4xl font-bold">Now Playing</h1>
                    <p className="text-lg text-stone-400">
                        {headerInfo.track} by {headerInfo.artists}
                    </p>
                </hgroup>
            </header>
            <main className="relative p-4">
                <SessionSearch />

                {role === "DJ" ? (
                    <DJPanel tracks={tracks} headerInfo={headerInfo} />
                ) : (
                    <ListenerPanel tracks={tracks} />
                )}
            </main>
        </RoleParams>
    )
}

export default Session
