import { Login } from "@/app/_components"
import { AuthLayout } from "@/app/_layouts"

const DJLogin = () => {
    return (
        <AuthLayout>
            <Login userType="DJ" />
        </AuthLayout>
    )
}

export default DJLogin
