"use client"

import { useRouter } from "next/navigation"
import { BASE_URL } from "@/utils/functions"
import { createContext, useContext, useMemo, useState } from "react"

type SpotifyAccessTokenContextType = {
    state: FormState
    spotifyAccessToken: SpotifyAccessToken | null
    handleSetSpotifyAccessToken: () => Promise<string | void>
}

const SpotifyAccessTokenContext = createContext<SpotifyAccessTokenContextType>({
    state: "idle",
    spotifyAccessToken: null,
    handleSetSpotifyAccessToken: async () => {},
})

const { Provider } = SpotifyAccessTokenContext

const SpotifyAccessTokenProvider = ({ children }: ChildrenPropType) => {
    const router = useRouter()
    const [spotifyAccessToken, setSpotifyAccessToken] =
        useState<SpotifyAccessToken | null>(null)
    const [state, setState] = useState<FormState>("idle")

    const handleSetSpotifyAccessToken = async () => {
        setState("loading")
        const res = await fetch(`${BASE_URL}/api/spotify/get-token`)

        if (!res.ok) {
            setState("error")
            console.error("An error occurred while fetching spotify token")
            return
        }

        const data = await res.json()

        if (data.status !== 200) {
            router.push("/api/spotify/authorize")
            return
        } else {
            const { spotifyToken } = data
            setSpotifyAccessToken(spotifyToken)
            setState("idle")
            return spotifyToken
        }
    }

    return (
        <Provider
            value={{
                spotifyAccessToken,
                state,
                handleSetSpotifyAccessToken,
            }}
        >
            {children}
        </Provider>
    )
}

const useSpotifyAccessToken = () => useContext(SpotifyAccessTokenContext)
export { SpotifyAccessTokenProvider, useSpotifyAccessToken }
