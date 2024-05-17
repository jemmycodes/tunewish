import { getUrl } from "@/utils/functions"
import { supabase } from "@/supabase/client"

export const logIn = async (fields: AuthLoginFields) => {
    const { data, error } = await supabase.auth.signInWithPassword(fields)
    return { data, error }
}

export const signUp = async (
    fields: AuthLoginFields,
    role: Roles,
    metadata: Metadata,
) => {
    console.log(getUrl())
    const { data, error } = await supabase.auth.signUp({
        ...fields,
        options: {
            data: { ...metadata, role },
            emailRedirectTo: getUrl(),
        },
    })

    console.log(data, error)

    return { data, error }
}

export const forgotPassword = async (email: string) => {
    console.log(getUrl(), "reset-password")
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${getUrl()}account/reset-password`,
    })

    return { data, error }
}

export const updatePassword = async (password: string) => {
    const { data, error } = await supabase.auth.updateUser({
        password,
    })

    return { data, error }
}
