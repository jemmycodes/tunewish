"use client"

import { z } from "zod"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { ForgotPasswordSchema } from "@/utils/schema"
import { FormFieldContainer } from "@/app/_components"
import { forgotPassword } from "@/supabase/client/authFunctions"

const ForgotPassword = () => {
    const { toast } = useToast()
    const [formState, setFormState] = useState<FormState>("idle")

    const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = async ({
        email,
    }: z.infer<typeof ForgotPasswordSchema>) => {
        setFormState("loading")
        toast({
            title: "Loading",
            description: "Please wait while we send a confirmation mail...",
        })

        const { data, error } = await forgotPassword(email)

        if (error) {
            toast({
                title: "Error",
                description: error.message,
            })
            setFormState("error")
            return
        }

        if (data) {
            toast({
                title: "Email Sent",
                description: `Check your mail for a confirmation link`,
            })
            setFormState("idle")
        }
    }

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-center text-2xl">
                    Forgot Password
                </CardTitle>
                <CardDescription className="max-w-xs text-center">
                    Forgot Password? We gotcha!
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormFieldContainer
                            placeholder="johndoe@google.com"
                            form={form}
                            name="email"
                            label="Email"
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={formState === "loading"}
                        >
                            {formState === "loading" && (
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {formState === "loading" ? "Loading" : "Submit"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default ForgotPassword
