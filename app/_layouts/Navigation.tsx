"use client"

import Link from "next/link"
import { GoHomeFill } from "react-icons/go"
import { usePathname } from "next/navigation"
import { IoMdSettings } from "react-icons/io"
import { IoLogOut, IoPlay } from "react-icons/io5"

const navigationData = [
    {
        title: "Home",
        icon: <GoHomeFill className="text-xl " />,
        path: "home",
    },
    {
        title: "Rooms",
        icon: <IoPlay className="text-xl " />,
        path: "rooms",
    },
    {
        title: "Settings",
        icon: <IoMdSettings className="text-xl " />,
        path: "settings",
    },
]

const Navigation = () => {
    const pathname = usePathname()

    return (
        <nav
            className="fixed bottom-5 left-1/2 z-50 flex w-full max-w-[320px] -translate-x-1/2
        items-center gap-3 rounded-full bg-stone-800/50 px-4 backdrop-blur md:sticky  md:left-0 md:top-0 md:translate-x-0
        md:flex-col  md:items-start md:justify-between md:gap-4 md:rounded-none md:bg-stone-800 md:p-3 md:backdrop-blur-none"
        >
            <h1 className="hidden w-full border-b border-stone-700 pb-4 md:block">
                Logo
            </h1>
            <ul className="mx-auto flex w-[70%] items-center justify-between md:w-full  md:flex-col md:items-start md:gap-3 ">
                {navigationData.map((item, index) => (
                    <li key={index + item.title} className="w-full self-start">
                        <Link
                            href={item.path}
                            className={`flex w-full flex-col items-center justify-center py-3 text-xs
                             text-stone-100 md:flex-row md:items-start md:justify-start md:gap-2 md:uppercase md:tracking-widest
                             ${pathname.includes(item.path) ? "rounded-full bg-blue-700 p-3 md:rounded" : ""}   `}
                        >
                            {item.icon}
                            <span className="mt-1">{item.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className=" self-stretch  py-3 pr-3 md:w-full md:border-t md:border-stone-700">
                <button className="flex h-full w-full flex-col items-center gap-1 p-0 text-xs md:flex-row  md:uppercase md:tracking-widest">
                    <IoLogOut className="text-xl text-stone-100" />
                    <span className="mt-1">Logout</span>
                </button>
            </div>
        </nav>
    )
}

export default Navigation
