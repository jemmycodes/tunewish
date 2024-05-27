import { Header } from "@/app/_layouts"
import { Toaster } from "@/components/ui/sonner"
import { supabaseServerClient } from "@/supabase/server"

const Layout = async ({ children }: ChildrenPropType) => {
    const supabase = supabaseServerClient()

    const { data: profiles } = await supabase
        .from("profiles")
        .select("*")
        .single()

    return (
        <>
            <Toaster />
            <div className="min-h-screen  bg-stone-950  ">
                {/*<Navigation />*/}
                <div className="mx-6 my-2 ">
                    <Header userProfile={profiles} />
                    <main className="relative my-5 w-full space-y-7 overflow-hidden ">
                        <h1 className="text-lg font-bold">Rooms</h1>
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}

export default Layout
