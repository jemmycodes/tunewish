import { Header } from "@/app/_layouts"
import CheckRole from "@/app/_layouts/CheckRole"
import { Toaster } from "@/components/ui/sonner"
import JoinRoomDialog from "@/app/_components/ui/JoinRoomDialog"
import { createSupabaseServerComponent } from "@/supabase/server"
import { cookies } from "next/headers"

const Layout = async ({ children }: ChildrenPropType) => {
    const supabase = createSupabaseServerComponent(cookies())

    const { data, error } = await supabase.auth.getUser()

    if (error) {
        console.error(error)
        return <div>Something went wrong!</div>
    }

    return (
        <CheckRole role="Listener">
            <Toaster />
            <div className="min-h-screen  bg-stone-950  ">
                <div className="mx-6 my-2 ">
                    <Header />
                    <main className="relative my-5 w-full space-y-7 overflow-hidden ">
                        <div className="flex items-center justify-between">
                            <h1 className="text-lg font-bold">Rooms</h1>
                            <JoinRoomDialog listener_id={data.user.id} />
                        </div>

                        {children}
                    </main>
                </div>
            </div>
        </CheckRole>
    )
}

export default Layout
