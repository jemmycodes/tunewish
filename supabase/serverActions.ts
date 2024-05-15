import { createClient } from "@supabase/supabase-js"
import { Metadata } from "next"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export const logIn = async (fields: AuthLoginFields) => {
    const { data, error } = await supabase.auth.signInWithPassword(fields)
    return { data, error }
}

export const signUp = async (
    fields: AuthLoginFields,
    role: Roles,
    metadata: Metadata,
) => {
    console.log(fields, metadata, role)
    const { data, error } = await supabase.auth.signUp({
        ...fields,
        options: {
            data: { ...metadata, role },
            emailRedirectTo: `${location.origin}/auth/confirm`,
        },
    })
    return { data, error }
}
