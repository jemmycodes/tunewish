import { NextRequest } from "next/server"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

export const createSupabaseServerComponent = (
    cookieStore: ReturnType<typeof cookies>,
) => {
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        },
    )
}

export async function POST(request: NextRequest) {
    const cookie = cookies()

    const room = await request.json()
    const supabase = createSupabaseServerComponent(cookie)

    const { data, error } = await supabase.from("rooms").insert(room).select()

    if (error) {
        console.log(data, error)
        return Response.json({
            message:
                error.message || "An error occurred while creating the room",
            error,
        })
    }

    console.log(data, error)
    return Response.json({
        message: "Room created successfully.",
        data,
    })
}
