import Link from "next/link"
import Image from "next/image"
import DJDeck from "@/public/dj-deck.jpg"
import PeoplePartying from "@/public/people-party.jpg"


const actionCardData = [
    {
        title: "DJ",
        description: "Fine tune your playlist to match your audience taste without leaving your stand",
        image: DJDeck,
        link: "/DJ/login",
    },
    {
        title: "Listener",
        description: "Play your favorite music and request songs from the DJ without leaving your seat",
        image: PeoplePartying,
        link: "/listener/login",
    },
]

const ChooseAction = () => {
    return (
        <main className="flex min-h-screen w-screen items-center justify-center p-10">
            <section className="flex flex-col items-center gap-8 ">
                <hgroup className="flex flex-col items-center justify-center gap-2">
                    <h1 className="text-4xl font-semibold">
                        Welcome to TuneWish
                    </h1>
                    <h2 className="text-sm text-white/70">
                        We would like to know who you are
                    </h2>
                </hgroup>
                <div className="flex flex-wrap gap-10">
                    {actionCardData.map((actionCard, index) => (
                        <ActionCards key={index} {...actionCard} />
                    ))}
                </div>
            </section>
        </main>
    )
}

interface ActionCardsProps {
    title: string
    image: string
    description: string
    link: string
}

const ActionCards = ({ title, image, description, link }: ActionCardsProps) => {
    return (
        <Link
            href={link}
            className="rounded-2xl  bg-[#101010]  max-w-sm mx-auto shadow-lg backdrop-blur-2xl flex  flex-col gap-2"
        >
            <Image
                src={image}
                alt={title}
                className="h-48 w-full object-cover aspect-video rounded-t-2xl"
                height={100}
                width={100}
            />
            <hgroup className="flex flex-col gap-2 justify-center items-center px-5 py-5">

            <p className=" text-2xl font-semibold">{title}</p>
            <p className="text-center text-sm">{description}</p>
            </hgroup>
        </Link>
    )
}

export default ChooseAction
