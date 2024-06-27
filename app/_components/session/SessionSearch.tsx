"use client"

import { Input } from "@/components/ui/input"
import useSearch from "@/app/hooks/useSearch"
import SessionSearchList from "@/app/_components/session/SessionSearchList"

const SessionSearch = () => {
    const { search, searchState, searchResult, handleSetSearch } = useSearch()

    return (
        <div className="relative w-full max-w-sm">
            <Input
                type="text"
                placeholder="Search for a song..."
                value={search}
                onChange={(event) => handleSetSearch(event.target.value)}
            />
            {!searchResult ||
                (searchState === "error" && (
                    <SearchResultsPane
                        search={search}
                        className="items-center justify-center p-4"
                    >
                        Error...
                    </SearchResultsPane>
                ))}

            {searchState === "loading" && (
                <SearchResultsPane
                    search={search}
                    className="items-center justify-center p-4"
                >
                    loading...
                </SearchResultsPane>
            )}

            {searchState === "success" && (
                <SearchResultsPane search={search}>
                    {searchResult && searchResult.length > 0 ? (
                        searchResult?.map((track) => (
                            <SessionSearchList track={track} key={track.id} />
                        ))
                    ) : (
                        <p className="p-4 text-center">
                            No results found for{" "}
                            <span className="font-medium italic">
                                &quot;{search}&quot;
                            </span>
                        </p>
                    )}
                </SearchResultsPane>
            )}
        </div>
    )
}

export default SessionSearch

interface SearchResultsPaneProps extends ChildrenPropType {
    search: string
    className?: string
}

const SearchResultsPane = ({
    search,
    children,
    className,
}: SearchResultsPaneProps) => {
    return (
        search.length > 0 && (
            <ul
                className={`scrollbar-hide absolute flex max-h-[35vh] w-full  flex-col gap-2 overflow-y-scroll bg-stone-950 ${className}`}
            >
                {children}
            </ul>
        )
    )
}
