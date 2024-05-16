import { updateSession } from "@/supabase/middleware"
import { NextRequest, NextResponse } from "next/server"

const protectedPages = ["/DJ/Home", "/Listener/Home", "/account/reset-password"]

export async function middleware(request: NextRequest) {
    const { user, response } = await updateSession(request)

    console.log(user)

    console.log(
        user,
        !user && protectedPages.includes(request.nextUrl.pathname),
        protectedPages.includes(request.nextUrl.pathname),
        request.nextUrl.pathname,
    )

    if (!user && protectedPages.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/choose-action", request.url))
    }

    console.log(response)
    return response
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
