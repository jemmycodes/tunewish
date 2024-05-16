"use client"

import Link from "next/link"
import { useState } from "react"
import DJDeck from "@/public/dj-deck.jpg"
import bgImage from "@/public/choose-action-bg.jpg"
import Image, { StaticImageData } from "next/image"
import PeoplePartying from "@/public/people-party.jpg"

const actionCardData = [
    {
        title: "DJ",
        description:
            "Fine tune your playlist to match your audience taste without leaving your stand",
        image: DJDeck,
        link: "/account/DJ/signup",
    },
    {
        title: "Listener",
        description:
            "Play your favorite music and request songs from the DJ without leaving your seat",
        image: PeoplePartying,
        link: "/account/Listener/signup",
    },
]

const ChooseAction = () => {
    return (
        <main className="flex min-h-screen w-screen items-center justify-center p-10">
            <Image
                src={bgImage}
                alt=""
                className="fixed top-0 -z-10 min-h-screen w-full  object-cover "
            />

            <div className="fixed top-0 -z-10 min-h-screen w-full bg-black/60"></div>
            <section className="flex flex-col items-center gap-8 ">
                <hgroup className="flex flex-col items-center justify-center gap-2">
                    <h1 className="text-center text-4xl font-semibold">
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
    image: StaticImageData
    description: string
    link: string
}

const ActionCards = ({ title, image, description, link }: ActionCardsProps) => {
    const handleUserAction = () => {
        localStorage.setItem("role", title)
    }

    return (
        <Link
            onClick={handleUserAction}
            href={link}
            className="mx-auto flex max-w-sm flex-col gap-2 rounded-2xl bg-[#101010]  shadow-lg backdrop-blur-2xl"
        >
            <Image
                src={image}
                alt={title}
                className="aspect-video h-48 w-full rounded-t-2xl object-cover"
            />
            <hgroup className="flex flex-col items-center justify-center gap-2 px-5 py-5">
                <p className=" text-2xl font-semibold">{title}</p>
                <p className="text-center text-sm">{description}</p>
            </hgroup>
        </Link>
    )
}

export default ChooseAction
