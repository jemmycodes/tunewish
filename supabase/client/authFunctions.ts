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
    const { data, error } = await supabase.auth.signUp({
        ...fields,
        options: {
            data: { role, ...metadata },
            emailRedirectTo: `${getUrl()}`,
        },
    })
    return { data, error }
}

export const forgotPassword = async (email: string) => {
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
