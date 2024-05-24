import { IoNotifications } from "react-icons/io5"
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar"

const Header = () => {
    return (
        <header className=" flex w-full items-center justify-between border-b border-stone-700 pb-2">
            <h1 className="font-bold ">Hi, Jemimah</h1>

            <div className="flex gap-2">
                <button>
                    <IoNotifications className="text-xl" />
                </button>
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://randomuser.me/api/port" />
                    <AvatarFallback>TA</AvatarFallback>
                </Avatar>
                <span className=" hidden flex-col text-sm md:flex">
                    <span>Username</span>
                    <span className="text-xs text-stone-600">Role</span>
                </span>
            </div>
        </header>
    )
}

export default Header
