"use client"

import { z } from "zod"
import {
    Dialog,
    DialogClose,
    DialogHeader,
    DialogContent,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { ReactNode, useState } from "react"
import { useRouter } from "next/navigation"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { CreateRoomSchema } from "@/utils/schema"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormFieldContainer } from "@/app/_components"

interface CustomDialogProps {
    trigger: ReactNode
}

const dialogData = [
    {
        name: "description",
        label: "Room Description",
        placeholder: "This is a room for all the cool kids in the block",
    },
    {
        name: "dress_code",
        label: "Dress Code",
        placeholder: "Bad and Boogie",
    },
    {
        name: "message",
        label: "Message to Attendees",
        placeholder: "Please be punctual and come with your dancing shoes on.",
    },
]

const CustomDialog = ({ trigger }: CustomDialogProps) => {
    const { toast } = useToast()
    const router = useRouter()

    const [formState, setFormState] = useState<FormState>("idle")

    const form = useForm<z.infer<typeof CreateRoomSchema>>({
        resolver: zodResolver(CreateRoomSchema),
    })

    const onSubmit = async (values: z.infer<typeof CreateRoomSchema>) => {
        setFormState("loading")
        const res = await fetch(`${location.origin}/api/DJ/create-room`, {
            method: "POST",
            body: JSON.stringify(values),
        })

        const data = await res.json()

        if (!res.ok) {
            toast({
                title: "An error occurred",
                description: data.message,
            })
            return
        }

        toast({
            title: "Room Created",
            description: "Room has been successfully created",
        })
        setFormState("success")
        router.refresh()
    }

    return (
        <Dialog>
            <DialogTrigger className="flex items-center gap-1 rounded bg-stone-50 px-4 py-2  text-stone-900 hover:bg-stone-50/90 ">
                {trigger}
            </DialogTrigger>
            <DialogContent className="m-4">
                <DialogHeader>Create A Room</DialogHeader>
                <DialogDescription>
                    <p>
                        Fill the inputs with necessary information to help your
                        users understand what your room is about
                    </p>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="my-5 space-y-8"
                        >
                            <div className="grid gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormFieldContainer
                                        form={form}
                                        name="name"
                                        label="Room Name"
                                        placeholder="Room 1"
                                        className="text-white"
                                    />
                                    <FormFieldContainer
                                        form={form}
                                        name="location"
                                        label="Location"
                                        className="text-white"
                                        placeholder="Lagos, Nigeria"
                                    />
                                </div>

                                {dialogData.map((data, index) => (
                                    <FormFieldContainer
                                        form={form}
                                        name={data.name}
                                        label={data.label}
                                        className="text-white"
                                        key={index + data.name}
                                        placeholder={data.placeholder}
                                    />
                                ))}
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={formState === "loading"}
                            >
                                {formState === "loading" && (
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {formState === "loading"
                                    ? "Creating Room"
                                    : "Create a Room"}
                            </Button>
                        </form>
                    </Form>
                </DialogDescription>
                <DialogClose asChild>Close</DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default CustomDialog
