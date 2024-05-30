"use client"

import { useRouter } from "next/navigation"
import useProfile from "@/app/hooks/useProfile"
import LoadingScreen from "@/app/_layouts/LoadingScreen"

interface CheckRoleProps extends ChildrenPropType {
    role: Roles
}

const CheckRole = ({ children, role }: CheckRoleProps) => {
    const router = useRouter()
    const { userProfile, apiResponse, handleRetry } = useProfile()

    if (apiResponse === "error") {
        console.log(apiResponse)
        return (
            <div className="flex min-h-screen w-screen items-center justify-center p-4">
                <div className="max-w-sm rounded-lg border-stone-800 bg-stone-950 px-4 py-3 text-sm text-stone-50">
                    <h1 className="font-medium leading-none tracking-tight">
                        Failed to fetch user status
                    </h1>
                    <p>
                        An error occurred while getting data .{" "}
                        <button onClick={handleRetry} className="text-blue-500">
                            Retry
                        </button>
                    </p>
                </div>
            </div>
        )
    }

    return (
        <>
            {apiResponse === "loading" && (
                <LoadingScreen message="Validating user status..." />
            )}
            {userProfile && userProfile.role === role && children}
            {userProfile &&
                userProfile.role !== role &&
                router.push(`/${userProfile.role}`)}
        </>
    )
}

export default CheckRole
