import { Header, Navigation } from "@/app/_layouts"

const Layout = ({ children }: ChildrenPropType) => {
    return (
        <div className="grid-cols-dashboard min-h-screen bg-stone-950  md:grid">
            <Navigation />
            <div className="mx-6 my-2 ">
                <Header />
                <main className="relative my-5 space-y-7 overflow-hidden">
                    {/*<div className="absolute h-72 w-96  rounded-full bg-red-600/50 blur-2xl backdrop-blur-xl "></div>*/}
                    {/*<div className="absolute bottom-10 left-0 top-1/2 h-72 w-96 rounded-full bg-yellow-600/50 blur-2xl backdrop-blur-xl"></div>*/}
                    {/*<div className="absolute left-1/2 top-1/2  h-72 w-96  -translate-y-1/2 rounded-full bg-purple-600/50 blur-3xl backdrop-blur-xl"></div>*/}
                    {/*<div></div>*/}
                    {/*<div></div>*/}
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout
