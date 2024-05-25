"use client"

import Image from "next/image"
import ErrorImage from "@/public/404.svg"
import { Button } from "@/components/ui/button"

const Error = ({ error, reset }: ErrorProps) => {
    return (
        <main className="flex h-dvh flex-col items-center justify-center gap-4 p-4">
            <Image src={ErrorImage} alt="Error" className="w-full max-w-lg" />
            <h1 className="text-center text-xl font-bold">
                Oooooops, Page not Found!
            </h1>
            <p className="text-center text-sm text-stone-400">
                {error.message}
            </p>
            <Button onClick={() => reset()}>Try Again</Button>
        </main>
    )
}

export default Error
