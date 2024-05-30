import { Toaster } from "@/components/ui/sonner"
import CheckRole from "@/app/_layouts/CheckRole"
import { Header } from "@/app/_layouts"

const Layout = ({ children }: ChildrenPropType) => {
    return (
        <CheckRole role="DJ">
            <Toaster />
            <div className="min-h-screen  bg-stone-950  ">
                {/*<Navigation />*/}
                <div className="mx-6 my-2 ">
                    <Header />
                    <main className="relative my-5 w-full space-y-7 overflow-hidden ">
                        {children}
                    </main>
                </div>
            </div>
        </CheckRole>
    )
}

export default Layout
