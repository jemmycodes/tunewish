import { ReactNode } from "react"
import { Tables } from "@/types/supabase"
import Error from "@/app/rooms/error"

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

    interface ErrorProps {
        error: Error & { digest?: string }
        reset: () => void
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
