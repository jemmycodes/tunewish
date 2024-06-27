import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    const spotifyCookie = request.cookies.get("spotify_token") ?? null

    if (!spotifyCookie) {
        return Response.json({ error: null, status: 404 })
    }

    const spotifyToken = JSON.parse(spotifyCookie.value)

    return Response.json({ spotifyToken, status: 200 })
}
