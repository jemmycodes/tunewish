import { ReactNode } from "react"
import { Tables } from "@/types/supabase"

declare global {
    interface AuthLoginFields {
        email: string
        password: string
    }

    interface Metadata {
        firstName: string
        lastname: string
        username: string
    }

    type Profile = Tables["profiles"]["Row"]

    interface ChildrenPropType {
        children: ReactNode
    }

    type Roles = "DJ" | "Listener"
    type AuthActions = "Log In" | "Sign Up"
    type FormState = "idle" | "loading" | "error" | "success"
}
export {}
