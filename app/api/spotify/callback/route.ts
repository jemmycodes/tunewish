import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { BASE_URL } from "@/utils/functions"

export async function GET(request: Request) {
    const cookie = cookies()
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code") || null
    const state = searchParams.get("state") || null

    const formBody = (details: Record<string, string>) => {
        return Object.keys(details)
            .map(
                (key) =>
                    encodeURIComponent(key) +
                    "=" +
                    encodeURIComponent(details[key]),
            )
            .join("&")
    }

    if (state === null) return Response.json({ error: true, status: 500 })

    const formData = {
        code,
        redirect_uri: `${BASE_URL}/api/spotify/callback`,
        grant_type: "authorization_code",
    } as Record<string, string>

    const authOptions = {
        method: "POST",
        body: formBody(formData),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
                "Basic " +
                // @ts-ignore
                new Buffer.from(
                    process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID +
                        ":" +
                        process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
                ).toString("base64"),
        },
        json: true,
    } as RequestInit

    const res = await fetch(process.env.NEXT_PUBLIC_SPOTIFY_TOKEN!, authOptions)
    const data = await res.json()

    if (res.ok && data.access_token) {
        const cookiesOption = {
            httpOnly: true,
            secure: true,
        }

        const spotifyToken = {
            access_token: data.access_token,
            refresh_token: data.refresh_token,
        }

        cookie.set({
            name: "spotify_token",
            value: JSON.stringify(spotifyToken),
            options: cookiesOption,
        } as RequestCookie)

        return redirect(
            `${BASE_URL}/rooms/61a6fae6-7e70-4fae-b96a-613b10c64e65/session`,
        )
    } else {
        return redirect("/unauthorized")
    }
}
