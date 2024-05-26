"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        router.push("/choose-action")
    }, [router])

    return (
        <main className="flex min-h-screen items-center justify-center ">
            <Link
                href="/choose-action"
                className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 underline backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
            >
                <code>Click Here To Get Started!</code>
            </Link>
        </main>
    )
}
