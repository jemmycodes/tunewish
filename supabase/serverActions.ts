import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export const loginAsDJ = async (fields: {
    email: string
    password: string
}) => {
    console.log(fields)
    const { data, error } = await supabase.auth.signInWithPassword(fields)
    return { data, error }
}

export const signUpAsDJ = async (fields: {
    email: string
    password: string
}) => {
    const { data, error } = await supabase.auth.signUp(fields)
    return { data, error }
}
