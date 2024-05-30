import { useEffect, useState } from "react"

const useProfile = () => {
    const [userProfile, setUserProfile] = useState<Profile | null>(null)
    const [retry, setRetry] = useState(false)
    const [apiResponse, setApiResponse] = useState<CallApiState>("idle")

    useEffect(() => {
        const fetchProfiles = async () => {
            setApiResponse("loading")
            const res = await fetch(`${location.origin}/api/profile`)

            const data = await res.json()

            if (data.status !== 200) {
                console.error("An error occurred while fetching the profile")
                setApiResponse("error")
                setRetry(false)
                return
            }

            const { data: userProfile } = data
            setUserProfile(userProfile)
            setApiResponse("success")
            setRetry(false)
        }

        fetchProfiles().catch(console.error)
    }, [retry])

    const handleRetry = () => {
        setRetry(true)
    }

    return {
        userProfile,
        apiResponse,
        handleRetry,
    }
}
export default useProfile
