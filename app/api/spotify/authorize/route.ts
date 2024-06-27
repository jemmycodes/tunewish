import { NextResponse } from "next/server"
import { BASE_URL, generateRandomString } from "@/utils/functions"

export async function GET(request: Request) {
    const scope = "streaming user-read-email user-read-private"
    const state = generateRandomString(16)

    const params = new URLSearchParams(request.url)
    params.set("client_id", process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!)
    params.set("response_type", "code")
    params.set("redirect_uri", `${BASE_URL}/api/spotify/callback`)
    params.set("state", state)
    params.set("scope", scope)

    const url = `https://accounts.spotify.com/authorize?${params.toString()}`
    return NextResponse.redirect(url)
}
