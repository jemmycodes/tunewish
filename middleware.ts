import { updateSession } from "@/supabase/server/middleware"
import { NextRequest, NextResponse } from "next/server"

const protectedPages: string[] = []

export async function middleware(request: NextRequest) {
    const { user, response } = await updateSession(request)

    let newResponse = response

    if (!user && protectedPages.includes(request.nextUrl.pathname)) {
        const destinationUrl = new URL("/choose-action", request.url)
        newResponse = NextResponse.redirect(destinationUrl, { status: 302 })

        Object.keys(request.headers).forEach((key) => {
            newResponse.headers.set(key, request.headers.get(key) as string)
        })
    }

    return newResponse
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:s
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
}
