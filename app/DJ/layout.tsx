import { Header, Navigation } from "@/app/_layouts"
import { supabaseServerClient } from "@/supabase/server"

const Layout = async ({ children }: ChildrenPropType) => {
    const supabase = supabaseServerClient()

    const { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .single()

    if (error) {
        return <p>An error occurred</p>
    }

    return (
        <div className="min-h-screen grid-cols-dashboard bg-stone-950  md:grid">
            <Navigation />
            <div className="mx-6 my-2 ">
                <Header userProfile={profiles} />
                <main className="relative my-5 w-full space-y-7 overflow-hidden ">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout
