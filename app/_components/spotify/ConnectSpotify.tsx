"use client"

import Image from "next/image"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import spotify from "@/public/spotify.svg"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useSpotifyAccessToken } from "@/app/context/useSpotifyAccessToken"

const ConnectSpotify = () => {
    const { toast } = useToast()
    const { handleSetSpotifyAccessToken, state, spotifyAccessToken } =
        useSpotifyAccessToken()

    console.log(spotifyAccessToken)

    return (
        !spotifyAccessToken && (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger onClick={handleSetSpotifyAccessToken}>
                        <Badge className=" my-2 space-x-1" variant="outline">
                            <Image
                                src={spotify}
                                alt="Spotify Logo"
                                width={20}
                                height={20}
                            />
                            <p>Connect to Spotify</p>
                        </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="mx-4 max-w-xs  p-3">
                        <p>
                            Click to connect your spotify account to extend
                            functions you can perform like playing songs and
                            much more!
                        </p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    )
}

export default ConnectSpotify
