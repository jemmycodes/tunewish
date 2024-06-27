import Image from "next/image"
import { Button } from "@/components/ui/button"

interface SessionRequestCardProps {
    image: string
    by: string
    title: string
    from: string
}

const SessionRequestCard = ({
    image,
    by,
    title,
    from,
}: SessionRequestCardProps) => {
    return (
        <div className="flex items-stretch gap-3 rounded-md bg-stone-950">
            <Image
                src={image}
                alt="track"
                width={100}
                height={100}
                className="aspect-auto  w-[30%] max-w-[9rem] rounded-l-md object-cover"
            />
            <div className="flex flex-col justify-between gap-4 px-2 py-3">
                <section className="flex flex-col gap-1">
                    <p className="text-sm text-stone-400">
                        From: <span className="text-stone-200">{from}</span>
                    </p>
                    <p className="text-sm text-stone-400">
                        Title: <span className="text-stone-200">{title}</span>
                    </p>
                    <p className="text-sm text-stone-400">
                        By: <span className="text-stone-200">{by}</span>
                    </p>
                </section>
                <div className="flex items-center justify-between gap-2 ">
                    <Button>Accept</Button>
                    <Button variant="destructive">Reject</Button>
                </div>
            </div>
        </div>
    )
}

export default SessionRequestCard
