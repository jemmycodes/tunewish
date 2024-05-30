import { Header } from "@/app/_layouts"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
import CheckRole from "@/app/_layouts/CheckRole"

const Layout = async ({ children }: ChildrenPropType) => {
    return (
        <CheckRole role="Listener">
            <Toaster />
            <div className="min-h-screen  bg-stone-950  ">
                <div className="mx-6 my-2 ">
                    <Header />
                    <main className="relative my-5 w-full space-y-7 overflow-hidden ">
                        <div className="flex items-center justify-between">
                            <h1 className="text-lg font-bold">Rooms</h1>
                            <Button>Join Room</Button>
                        </div>

                        {children}
                    </main>
                </div>
            </div>
        </CheckRole>
    )
}

export default Layout
