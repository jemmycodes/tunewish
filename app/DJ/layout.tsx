import { Header, Navigation } from "@/app/_layouts"

const Layout = ({ children }: ChildrenPropType) => {
    return (
        <div className="min-h-screen grid-cols-dashboard bg-stone-950  md:grid">
            <Navigation />
            <div className="mx-6 my-2 ">
                <Header />
                <main className="relative my-5 w-full space-y-7 overflow-hidden ">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout
