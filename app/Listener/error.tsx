"use client"

import Link from "next/link"
import Image from "next/image"
import ErrorImage from "@/public/404.svg"
import { Button } from "@/components/ui/button"

const Error = ({ error, reset }: ErrorProps) => {
    console.error(error)

    return (
        <main className="flex h-dvh flex-col items-center justify-center gap-4 p-4">
            <Image src={ErrorImage} alt="Error" className="w-full max-w-md" />
            <h1 className="text-center text-xl font-bold">
                Oooooops, Page not Found!
            </h1>
            <h2 className="font-bold">Seems you have a broken link</h2>
            <p className="max-w-sm text-center text-sm text-stone-400">
                This room does not exist or has been deleted. Contact the host
                for more information.
            </p>
            <span className="flex gap-4">
                <Button onClick={() => reset()}>Try Again</Button>
                <Link
                    href="/DJ/rooms"
                    className="rounded-md border border-stone-100 p-2 text-sm transition-colors  duration-200 ease-in-out hover:bg-stone-500"
                >
                    Go to Dashboard
                </Link>
            </span>
        </main>
    )
}

export default Error
