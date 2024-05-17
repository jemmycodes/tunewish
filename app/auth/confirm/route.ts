import { type EmailOtpType } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

import { supabaseServerClient } from "@/supabase"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const token_hash = searchParams.get("token_hash")
    const type = searchParams.get("type") as EmailOtpType | null
    let next = searchParams.get("role") as Roles

    const redirectTo = request.nextUrl.clone()
    redirectTo.pathname = `/account/${next}/home`
    redirectTo.searchParams.delete("token_hash")
    redirectTo.searchParams.delete("type")
    redirectTo.searchParams.delete("role")

    if (token_hash && type) {
        const supabase = supabaseServerClient()

        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        })
        if (!error) {
            return NextResponse.redirect(redirectTo)
        }
    }

    // return the user to an error page with some instructions
    redirectTo.pathname = "/error"
    return NextResponse.redirect(redirectTo)
}
