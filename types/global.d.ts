import { ReactNode } from "react"
import Error from "@/app/rooms/error"
import { Tables } from "@/types/supabase"

declare global {
    interface AuthLoginFields {
        email: string
        password: string
    }

    type Roles = "DJ" | "Listener"
    type RoomType = Tables["rooms"]["Row"]
    type AuthActions = "Log In" | "Sign Up"
    type Profile = Tables["profiles"]["Row"]
    type RoomStatus = "pending" | "in session" | "finished"
    type ListenerRoomProps = Tables["listeners_room"]["Row"]
    type FormState = "idle" | "loading" | "error" | "success"
    type CallApiState = "idle" | "loading" | "success" | "error"

    interface Metadata {
        firstName: string
        lastname: string
        username: string
    }

    interface ErrorProps {
        error: Error & { digest?: string }
        reset: () => void
    }

    interface ChildrenPropType {
        children: ReactNode
    }
}
export {}
