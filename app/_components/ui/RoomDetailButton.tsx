"use client"

import { FaArrowRight } from "react-icons/fa6"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import useJoinRoom from "@/app/hooks/useJoinRoom"
import useHandleStartRoom from "@/app/hooks/useHandleStartRoom"
import Link from "next/link"

const RoomDetailButtonDJ = ({
    dj_id,
    status,
    room_id,
}: {
    dj_id: string
    status: RoomStatus
    room_id: string
}) => {
    const { handleStartRoom, formState } = useHandleStartRoom({
        dj_id,
        room_id,
    })
    return status === "in session" ? (
        <Link
            href={`/rooms/${room_id}/session`}
            className="flex w-fit items-center gap-2 rounded-md bg-stone-50 px-4 py-2
            text-sm font-medium text-stone-900
            transition-colors duration-200 ease-in-out hover:bg-stone-50/80
            "
        >
            Back to Session <FaArrowRight />
        </Link>
    ) : (
        <Button onClick={handleStartRoom} disabled={formState === "loading"}>
            {formState === "loading" ? (
                <>
                    Starting Session
                    <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
                </>
            ) : (
                <>
                    Start Session
                    <FaArrowRight className="ml-2" />
                </>
            )}
        </Button>
    )
}

const RoomDetailButtonListener = ({
    listener_id,
    room_id,
}: {
    listener_id: string
    room_id: string
}) => {
    const { handleJoinRoom, formState: joinState } = useJoinRoom({
        listener_id,
        room_id,
        is_active: true,
    })
    return (
        <Button onClick={handleJoinRoom} disabled={joinState === "loading"}>
            {joinState === "loading" ? (
                <>
                    Joining Room
                    <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
                </>
            ) : (
                <>
                    Join Room
                    <FaArrowRight className="ml-2" />
                </>
            )}
        </Button>
    )
}

export { RoomDetailButtonDJ, RoomDetailButtonListener }
