import Image from "next/image"
import { ReactNode } from "react"
import authbg from "@/public/auth-bg.webp"

interface CustomWrapperComponent {
    children: ReactNode
}

const AuthLayout = ({ children }: CustomWrapperComponent) => {
    return (
        <main
            id="auth-layout"
            className=" flex min-h-screen w-full items-center justify-center bg-cover p-10"
        >
            <Image
                src={authbg}
                alt="Party"
                className="fixed -z-10 min-h-screen w-full  object-cover "
            />

            <div className="fixed top-0 -z-10 min-h-screen w-full bg-black/60"></div>
            {children}
        </main>
    )
}

export default AuthLayout
