"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import authbg from "@/public/auth-bg.webp"
import { ReactNode, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

interface AccountLayoutProps {
    children: ReactNode
}

const AccountLayout = ({ children }: AccountLayoutProps) => {
    const { toast } = useToast()
    const router = useRouter()

    useEffect(() => {
        const role = localStorage.getItem("role")
        if (!role) {
            toast({
                title: "Error",
                description: "You need to choose a role first",
            })
            router.push("/choose-action")
        }
        //     eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            {children}
        </main>
    )
}

export default AccountLayout
