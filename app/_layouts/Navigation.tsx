"use client"

import {
    IoPlay,
    IoPlayOutline,
    IoSettingsOutline,
    IoSettings,
} from "react-icons/io5"
import Link from "next/link"
import { IoLogOut } from "react-icons/io5"
import { supabase } from "@/supabase/client"
import { GoHomeFill, GoHome } from "react-icons/go"
import { useToast } from "@/components/ui/use-toast"
import { usePathname, useRouter } from "next/navigation"

const navigationData = [
    {
        path: "/DJ",
        title: "Home",
        icon: <GoHome />,
        activeIcon: <GoHomeFill />,
    },
    {
        title: "Rooms",
        path: "/DJ/rooms",
        activeIcon: <IoPlay />,
        icon: <IoPlayOutline />,
    },
    {
        title: "Settings",
        path: "/DJ/settings",
        activeIcon: <IoSettings />,
        icon: <IoSettingsOutline />,
    },
]

const Navigation = () => {
    const { toast } = useToast()
    const router = useRouter()
    const pathname = usePathname()

    const handleLogout = async () => {
        toast({
            title: "Logging out...",
            description: "Please wait while you're logged out...",
        })

        const { error } = await supabase.auth.signOut()

        if (error) {
            console.log(error)
            toast({
                title: "Error",
                description: "An error occurred while logging out",
            })
            return
        }

        toast({
            title: "Success",
            description: "You have been logged out, redirecting you...",
        })
        localStorage.removeItem("role")
        router.replace("/choose-action")
    }

    return (
        <nav
            className="fixed bottom-3 left-1/2 z-50 flex w-[90%]  max-w-sm -translate-x-1/2 items-center
        gap-3 rounded-full  bg-stone-800/50 px-4 backdrop-blur md:sticky  md:left-0 md:top-0 md:translate-x-0
        md:flex-col  md:items-start md:justify-between md:gap-4 md:rounded-none md:bg-stone-800 md:p-3 md:backdrop-blur-none"
        >
            <h1 className="hidden w-full border-b border-stone-700 pb-4 md:block">
                Logo
            </h1>
            <ul className=" flex w-full items-center justify-between  p-2 md:w-full  md:flex-col md:items-start md:gap-3 ">
                {navigationData.map((item, index) => (
                    <li key={index + item.title} className="md:w-full ">
                        <Link
                            href={item.path}
                            className={`flex flex-col items-center justify-center p-3 md:w-full md:flex-row md:justify-start  md:gap-2 
                            md:rounded-md md:p-2 md:font-semibold md:uppercase md:tracking-wide  md:text-white md:hover:bg-blue-500/20 md:hover:text-blue-500
                             ${
                                 pathname === item.path
                                     ? "flex-row rounded-full bg-blue-500/20  text-lg text-blue-500  md:rounded-md "
                                     : ""
                             }`}
                        >
                            {pathname === item.path
                                ? item.activeIcon
                                : item.icon}

                            <span
                                className={`mt-1 text-xs ${pathname === item.path ? "hidden md:block" : " "}`}
                            >
                                {item.title}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className=" hidden  self-stretch py-3 pr-3 md:block md:w-full md:border-t md:border-stone-700">
                <button
                    onClick={handleLogout}
                    className="flex h-full w-full flex-col items-center gap-1 p-0 text-xs md:flex-row  md:uppercase md:tracking-widest"
                >
                    <IoLogOut className=" text-xl " />
                    <span className="mt-1">Logout</span>
                </button>
            </div>
        </nav>
    )
}

export default Navigation
