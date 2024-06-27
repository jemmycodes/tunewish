import { NextRequest, NextResponse } from "next/server"
import { updateSession } from "@/supabase/server/middleware"

const authPages = [
    "/account/DJ/login",
    "/choose-action",
    "/account/DJ/signup",
    "/account/DJ/forgot-password",
    "/account/Listener/login",
    "/choose-action",
    "/account/Listener/signup",
    "/account/Listener/forgot-password",
]
const protectedPages: string[] = [
    "/DJ",
    "/DJ/rooms",
    "/DJ/settings",
    "/Listener",
]

const redirectWithHeaders = (
    url: string,
    request: NextRequest,
    response: NextResponse,
): NextResponse => {
    let newResponse = response

    const destinationUrl = new URL(url, request.url)
    newResponse = NextResponse.redirect(destinationUrl, { status: 302 })

    Object.keys(request.headers).forEach((key) => {
        newResponse.headers.set(key, request.headers.get(key) as string)
    })

    return newResponse
}

export async function middleware(request: NextRequest) {
    const { user, response } = await updateSession(request)

    let newResponse = response

    if (!user && protectedPages.includes(request.nextUrl.pathname))
        newResponse = redirectWithHeaders("/choose-action", request, response)

    if (user && authPages.includes(request.nextUrl.pathname))
        newResponse = redirectWithHeaders(
            `/${user.user_metadata.role}`,
            request,
            response,
        )

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
