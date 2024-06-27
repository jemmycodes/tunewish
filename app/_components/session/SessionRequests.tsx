import { TabsContent } from "@/components/ui/tabs"
import SessionRequestCard from "@/app/_components/session/SessionRequestCard"

const SessionRequests = ({ image }: { image: string }) => {
    return (
        <TabsContent value="Requests">
            <section className=" flex flex-col justify-between gap-5 2xsm:grid 2xsm:grid-cols-request_cards">
                <SessionRequestCard
                    image={image}
                    by="Tiwa Savage"
                    title="Koroba"
                    from="Jemimah"
                />
                <SessionRequestCard
                    image={image}
                    by="Tiwa Savage"
                    title="Koroba"
                    from="Jemimah"
                />
                <SessionRequestCard
                    image={image}
                    by="Tiwa Savage"
                    title="Koroba"
                    from="Jemimah"
                />
            </section>
        </TabsContent>
    )
}

export default SessionRequests
