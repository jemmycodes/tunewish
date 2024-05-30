"use client"

import useProfile from "@/app/hooks/useProfile"
import { getInitials } from "@/utils/functions"
import { IoNotifications } from "react-icons/io5"
import { Skeleton } from "@/components/ui/skeleton"
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const Header = () => {
    const { userProfile, apiResponse, handleRetry } = useProfile()

    if (apiResponse === "error") {
        return (
            <Alert>
                <AlertTitle>Failed to fetch profile</AlertTitle>
                <AlertDescription>
                    An error occurred while fetching the profile.{" "}
                    <button onClick={handleRetry} className="text-blue-500">
                        Retry
                    </button>
                </AlertDescription>
            </Alert>
        )
    }

    return (
        <header className=" flex w-full items-center justify-between border-b border-stone-700 pb-2">
            {userProfile && apiResponse === "success" && (
                <>
                    {" "}
                    <h1 className="font-bold ">Hi, {userProfile.firstname}</h1>
                    <div className="flex gap-2">
                        <button>
                            <IoNotifications className="text-xl" />
                        </button>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://randomuser.me/api/port" />
                            <AvatarFallback>
                                {getInitials(
                                    userProfile.firstname,
                                    userProfile.lastname,
                                )}
                            </AvatarFallback>
                        </Avatar>
                        <span className=" hidden flex-col text-sm md:flex">
                            <span>
                                {userProfile.username.startsWith("@")
                                    ? userProfile.username
                                    : `@${userProfile.username}`}
                            </span>
                            <span className="text-xs text-stone-600">
                                {userProfile.role}
                            </span>
                        </span>
                    </div>
                </>
            )}

            {apiResponse === "loading" && <Skeleton className="w-full p-4" />}
        </header>
    )
}

export default Header
