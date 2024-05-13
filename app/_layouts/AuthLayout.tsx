import Link from "next/link"
import Image from "next/image"
import { ReactNode } from "react"
import authbg from "@/public/auth-bg.webp"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface CustomWrapperComponent {
    children: ReactNode
    userType: "DJ" | "Listener"
    action: "Log In" | "Sign Up"
}

const AuthLayout = ({ children, userType, action }: CustomWrapperComponent) => {
    return (
        <main
            id="auth-layout"
            className=" flex min-h-screen w-full items-center justify-center bg-cover p-5"
        >
            <Image
                src={authbg}
                alt="Party"
                className="fixed top-0 -z-10 min-h-screen w-full  object-cover "
            />

            <div className="fixed top-0 -z-10 min-h-screen w-full bg-black/60"></div>
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <Link
                        className="text-right"
                        href={
                            userType === "DJ"
                                ? `/listener/${action.toLowerCase().split(" ").join("")}`
                                : `/DJ/${action.toLowerCase().split(" ").join("")}`
                        }
                    >
                        <Badge variant="secondary">
                            {action} as {userType === "DJ" ? "Listener" : "DJ"}
                        </Badge>
                    </Link>
                    <CardTitle className="text-center text-2xl">
                        {action}
                    </CardTitle>
                    <CardDescription className="max-w-xs text-center">
                        Enter your email to {action} to your {userType} account
                    </CardDescription>
                </CardHeader>
                <CardContent>{children}</CardContent>
            </Card>
        </main>
    )
}

export default AuthLayout
