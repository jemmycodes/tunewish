"use client"

import { z } from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { ForgotPasswordLayout } from "@/app/_layouts"
import { zodResolver } from "@hookform/resolvers/zod"
import { ForgotPasswordSchema } from "@/utils/schema"
import { FormFieldContainer } from "@/app/_components"
import { useToast } from "@/components/ui/use-toast"
import { forgotPassword } from "@/supabase/serverActions"
import { ReloadIcon } from "@radix-ui/react-icons"

const ForgotPasswordPage = () => {
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
        <ForgotPasswordLayout
            title="Forgot Password"
            description="You will receieve an email on how to reset your password"
        >
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
        </ForgotPasswordLayout>
    )
}

export default ForgotPasswordPage
