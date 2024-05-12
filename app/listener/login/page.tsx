import { Login } from "@/app/_components"
import { AuthLayout } from "@/app/_layouts"

const ListenerLogin = () => {
    return (
        <AuthLayout>
            <Login userType="Listener" />
        </AuthLayout>
    )
}

export default ListenerLogin
