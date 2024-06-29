import { supabase } from "@/supabase/client"

export const getUrl = () => {
    let url = location.origin

    // Add trailing slash if not present
    if (!url.endsWith("/")) {
        url += "/"
    }

    url = url.endsWith("/") ? url : `${url}/`

    return url
}

export const BASE_URL =
    process.env.NODE_ENV === "development"
        ? // ?
          // "http://localhost:3000"
          "http://192.168.0.183:3000"
        : process.env.NEXT_PUBLIC_BASE_URL

export const getInitials = (firstname: string, lastname: string) => {
    const lastInitial = lastname.charAt(0).toUpperCase()
    const firstInitial = firstname.charAt(0).toUpperCase()

    return `${firstInitial}${lastInitial}`
}

export const getSpotifyAccessToken = async () => {
    const authOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
            client_secret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!,
        }),
        redirect: "follow",
    } as RequestInit

    const response = await fetch(
        "https://accounts.spotify.com/api/token",
        authOptions,
    )

    //
    if (!response.ok)
        throw new Error("An error occurred; cannot get access token")

    const data = await response.json()

    if (data.error || !data.access_token) {
        return {
            status: 400,
            message: data.error_description || "An error occurred",
        }
    }

    const { access_token } = data

    return access_token
}

export const getRelevantFields = (data: any[]) => {
    const list: Track[] = []

    data.forEach((prop) => {
        const {
            id,
            name,
            artists,
            album: { images },
        } = prop

        const relevantFields = {
            id,
            images: images.map((image: any) => image.url),
            name: name.split("(")[0],
            artists: artists.map((artist: any) => ({
                name: artist.name,
                id: artist.id,
            })),
        } as Track

        list.push(relevantFields)
    })

    return list
}

export const generateRandomString = (length: number) => {
    let text = ""
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return text
}

export const userRoles = () => ({
    DJ: "DJ",
    Listener: "Listener",
})

export const checkIfListenerInRoom = async ({
    listener_id,
    room_id,
}: Record<string, string>) => {
    const { data, error } = await supabase
        .from("listeners_room")
        .select("room_id, listener_id")
        .eq("listener_id", listener_id)
        .eq("room_id", room_id)
        .single()

    if (error)
        return {
            status: 404,
            title: "An error occurred",
            description: "Please try again",
        }

    if (data)
        return {
            title: "Redirecting",
            description: "Room already joined, redirecting you to the room",
        }

    return
}

export const verifyDJ = async (id: string) => {
    const { data: user_id, error } = await supabase
        .from("rooms")
        .select("dj_id")
        .eq("dj_id", id)
        .single()

    if (error) {
        return {
            title: "Error",
            description: "You dont have access to start this room!",
        }
    }

    if (!user_id) {
        return {
            title: "Error",
            description: "An error occurred",
        }
    }

    return
}

export const verifyListener = async (id: string, room_id: string) => {
    const { data, error } = await supabase
        .from("listeners_room")
        .select("listener_id")
        .eq("listener_id", id)
        .eq("room_id", room_id)
        .single()

    if (error) {
        return {
            title: "Error",
            description: "An error occurred",
        }
    }

    if (!data) {
        return {
            title: "Error",
            description: "You do not have access to this room",
        }
    }

    return
}
