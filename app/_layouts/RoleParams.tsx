"use client"

import { supabase } from "@/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import LoadingScreen from "@/app/_layouts/LoadingScreen"
import { useCallback, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { verifyDJ, verifyListener } from "@/utils/functions"

const RoleParams = ({ children }: ChildrenPropType) => {
    const { toast } = useToast()
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState(true)

    const params = useMemo(
        () => new URLSearchParams(searchParams),
        [searchParams],
    )

    const fetchRole = useCallback(async () => {
        try {
            const { data, error } = await supabase.auth.getUser()

            if (error) {
                toast({
                    title: "Error",
                    description:
                        "An error occurred while connecting to the server",
                })
                return
            }

            if (!data) {
                toast({
                    title: "Error",
                    description: "User not found, redirecting to login...",
                })
                router.push("/login")
                return
            }

            params.set("role", data.user.user_metadata.role)
            const role = params.get("role")
            const room_id = pathname.split("/")[2]
            if (role === "DJ") {
                const response = await verifyDJ(data.user.id)
                if (response) {
                    toast(response)
                    router.replace(`/rooms/${room_id}`)
                    return
                }
                router.push(`${pathname}?role=${role}`)
            }

            if (role === "Listener") {
                const response = await verifyListener(data.user.id, room_id)
                if (response) {
                    toast(response)
                    router.replace(`/rooms/${room_id}`)
                    return
                }

                router.push(`${pathname}?role=${role}`)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [params, pathname, router, toast])

    useEffect(() => {
        fetchRole().catch()
    }, [fetchRole])

    if (loading)
        return <LoadingScreen message="Please wait while we get you in..." />

    return <>{children}</>
}

export default RoleParams
