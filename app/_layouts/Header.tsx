import { IoNotifications } from "react-icons/io5"
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getInitials } from "@/utils/functions"

const Header = ({ userProfile }: Profile) => {
    const { firstname, lastname, role, username } = userProfile
    const initials = getInitials(firstname, lastname)

    const prefixedUsername = username.startsWith("@")
        ? username
        : `@${username}`

    return (
        <header className=" flex w-full items-center justify-between border-b border-stone-700 pb-2">
            <h1 className="font-bold ">Hi, {firstname}</h1>

            <div className="flex gap-2">
                <button>
                    <IoNotifications className="text-xl" />
                </button>
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://randomuser.me/api/port" />
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <span className=" hidden flex-col text-sm md:flex">
                    <span>{prefixedUsername}</span>
                    <span className="text-xs text-stone-600">{role}</span>
                </span>
            </div>
        </header>
    )
}

export default Header
