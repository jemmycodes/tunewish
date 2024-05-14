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

    type Roles = "DJ" | "Listener"
    type AuthActions = "Log In" | "Sign Up"
    type FormState = "idle" | "loading" | "error" | "success"
}
export {}
