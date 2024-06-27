import { getRelevantFields, getSpotifyAccessToken } from "@/utils/functions"

export async function GET(request: Request) {
    const token = await getSpotifyAccessToken().catch((error) =>
        console.log(error),
    )

    const { searchParams } = new URL(request.url)

    const query = searchParams.get("q")

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SPOTIFY_API}/search?q=track%253A${query}&type=track&limit=50`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: "GET",
            next: {
                revalidate: 0,
            },
            redirect: "follow",
        },
    )

    console.log(response, response.ok)

    const data = await response.json()

    if (data.error) {
        return Response.json(data.error)
    }

    const { tracks } = data

    const searchResults = getRelevantFields(tracks.items)

    return Response.json(searchResults)
}
