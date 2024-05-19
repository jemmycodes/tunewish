import { IoPeople } from "react-icons/io5"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const DJHome = () => {
    return (
        <>
            <section className="relative space-y-4">
                <hgroup className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold"> Rooms Overview</h3>
                </hgroup>
                <div className="flex flex-wrap gap-4">
                    <Card className="  flex w-full max-w-60 flex-col justify-between backdrop-blur-md dark:bg-stone-800/50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-medium">
                                Graduation Party
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="">
                            <span className="flex items-center gap-2">
                                <IoPeople />
                                <p className="text-sm">40</p>
                            </span>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </>
    )
}

export default DJHome
