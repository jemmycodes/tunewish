import Image from "next/image"
import { ReactNode } from "react"
import authbg from "@/public/auth-bg.webp"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface ForgotPasswordLayoutProps {
    children: ReactNode
    title: string
    description: string
}

const ForgotPasswordLayout = ({
    children,
    title,
    description,
}: ForgotPasswordLayoutProps) => {
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
                    <CardTitle className="text-center text-2xl">
                        {title}
                    </CardTitle>
                    <CardDescription className="max-w-xs text-center">
                        {description}
                    </CardDescription>
                </CardHeader>
                <CardContent>{children}</CardContent>
            </Card>
        </main>
    )
}

export default ForgotPasswordLayout
