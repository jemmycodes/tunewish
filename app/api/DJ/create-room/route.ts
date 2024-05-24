import { cookies } from "next/headers"
import { NextRequest } from "next/server"
import { createSupabaseServerComponent } from "@/supabase/server"

export async function POST(request: NextRequest) {
    const cookie = cookies()

    const room = await request.json()
    const supabase = createSupabaseServerComponent(cookie)

    const { data, error } = await supabase.from("rooms").insert(room).select()

    if (error) {
        return Response.json({
            message:
                error.message || "An error occurred while creating the room",
            error,
        })
    }

    return Response.json({
        message: "Room created successfully.",
        data,
    })
}
