import { NextResponse } from "next/server"
import { createSupabaseServerComponent } from "@/supabase/server"
import { cookies } from "next/headers"

export async function GET() {
    const cookie = cookies()
    const supabase = createSupabaseServerComponent(cookie)

    const { data, error } = await supabase.from("profiles").select("*").single()

    console.log(1, data, error, "profile route")

    if (error) {
        return NextResponse.json({
            message:
                error.message ||
                "An error occurred while fetching the profile.",
            error,
            status: 500,
        })
    }

    return Response.json({
        message: "Profile fetched successfully.",
        data,
        status: 200,
    })
}
