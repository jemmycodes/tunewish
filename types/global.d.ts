import { ReactNode } from "react"
import { Tables } from "@/types/supabase"
import Error from "@/app/rooms/error"
import { getRedirectTypeFromError } from "next/dist/client/components/redirect"

declare global {
    interface AuthLoginFields {
        email: string
        password: string
    }

    type RoomStatus = "pending" | "in session" | "finished"

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
    type RoomType = Tables["rooms"]["Row"]
    type ListenerRoomProps = Tables["listeners_room"]["Row"]

    interface ChildrenPropType {
        children: ReactNode
    }

    type Roles = "DJ" | "Listener"
    type AuthActions = "Log In" | "Sign Up"
    type FormState = "idle" | "loading" | "error" | "success"
}
export {}
