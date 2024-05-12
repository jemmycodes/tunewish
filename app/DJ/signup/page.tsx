import { AuthLayout } from "@/app/_layouts"
import { Signup } from "@/app/_components"

const DJSignup = () => {
    return (
        <AuthLayout>
            <Signup userType="DJ" />
        </AuthLayout>
    )
}

export default DJSignup
