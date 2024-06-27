import { useEffect, useRef, useState } from "react"
import { BASE_URL } from "@/utils/functions"

const useSearch = () => {
    const sendRequest = useRef(false)

    const [search, setSearch] = useState<string>("")
    const [searchState, setSearchState] = useState<FormState>("idle")
    const [searchResult, setSearchResult] = useState<Track[] | null>(null)

    const handleSetSearch = (value: string) => {
        sendRequest.current = true
        setSearch(value)
    }

    useEffect(() => {
        if (!sendRequest.current) return
        let timeout: NodeJS.Timeout
        try {
            timeout = setTimeout(async () => {
                setSearchState("loading")
                const response = await fetch(
                    `${BASE_URL}/api/spotify/search-tracks?q=${encodeURIComponent(search)}`,
                )

                if (!response.ok) throw new Error("Error fetching data")

                const data = await response.json()

                if (!data || data.error) {
                    console.log(data.error)
                    throw new Error(data.error)
                }
                console.log(data)
                setSearchResult(data)
                setSearchState("success")
            }, 200)
        } catch (error) {
            setSearchState("error")
        } finally {
            setSearchState("idle")
            sendRequest.current = false
        }

        return () => {
            clearTimeout(timeout)
        }
    }, [search])

    return { search, searchState, searchResult, handleSetSearch }
}

export default useSearch
