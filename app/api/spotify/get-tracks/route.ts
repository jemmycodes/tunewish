import { getRelevantFields, getSpotifyAccessToken } from "@/utils/functions"

export async function GET() {
    const token = await getSpotifyAccessToken().catch((error) =>
        Response.json(error),
    )

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SPOTIFY_API}/recommendations?limit=100&seed_artists=1hNaHKp2Za5YdOAG0WnRbc,3tVQdUvClmAT7URs9V3rsp,3a1tBryiczPAZpgoZN9Rzg,&seed_genres=afrobeats&min_danceability=0.8&max_danceability=1&limit=10`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: "GET",
            next: {
                revalidate: 60,
            },
            redirect: "follow",
        },
    )

    const data = await response.json()

    if (data.error) return Response.json(data)

    const { tracks } = data

    const trackLists = getRelevantFields(tracks)

    return Response.json(trackLists)
}
