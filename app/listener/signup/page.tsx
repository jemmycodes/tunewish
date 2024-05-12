import { Signup } from "@/app/_components"
import { AuthLayout } from "@/app/_layouts"

const ListenerSignup = () => {
    return (
        <AuthLayout>
           <Signup userType="Listener" />
        </AuthLayout>
    )
}

export default ListenerSignup
