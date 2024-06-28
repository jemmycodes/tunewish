import { RiLoader4Line } from "react-icons/ri"

const LoadingScreen = ({ message }: { message: string }) => {
    return (
        <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-2 p-2">
            <RiLoader4Line className="animate-spin text-3xl" />
            <p className="font-semibold">{message}</p>
        </div>
    )
}

export default LoadingScreen
