import { supabaseServerClient } from "@/supabase/server"
import { type EmailOtpType } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

// Creating a handler to a GET request to route /auth/confirm
export async function GET(request: NextRequest) {
    const redirectTo = request.nextUrl.clone()
    const { searchParams } = new URL(request.url)

    const role = searchParams.get("role")
    const token_hash = searchParams.get("token_hash")
    const type = searchParams.get("type") as EmailOtpType | null

    // Create redirect link without the secret token
    redirectTo.pathname = `/${role}/home/`
    redirectTo.searchParams.delete("role")
    redirectTo.searchParams.delete("type")
    redirectTo.searchParams.delete("token_hash")

    if (token_hash && type) {
        const supabase = supabaseServerClient()

        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        })
        if (!error) {
            redirectTo.searchParams.delete("next")
            return NextResponse.redirect(redirectTo)
        }
    }

    // return the user to an error page with some instructions
    redirectTo.pathname = "/error"
    return NextResponse.redirect(redirectTo)
}
