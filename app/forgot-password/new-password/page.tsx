"use client"

import { z } from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { usePasswordVisibility } from "@/app/hooks"
import { NewPasswordSchema } from "@/utils/schema"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { ForgotPasswordLayout } from "@/app/_layouts"
import { FormFieldContainer } from "@/app/_components"
import { updatePassword } from "@/supabase/serverActions"

const NewPassword = () => {
    const router = useRouter()
    const { toast } = useToast()
    const newPassword = usePasswordVisibility()
    const confirmPassword = usePasswordVisibility()
    const [formState, setFormState] = useState<FormState>("idle")

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async ({ newPassword }: { newPassword: string }) => {
        setFormState("loading")
        toast({
            title: "Loading",
            description: "Please wait while we send a confirmation mail...",
        })

        const { data, error } = await updatePassword(newPassword)

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
                title: "Password Reset Successful",
                description: "Redirecting...",
            })
            setFormState("idle")
            router.push("/choose-action")
        }
    }

    return (
        <ForgotPasswordLayout
            title="Reset Password"
            description="Reset your password"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormFieldContainer
                        form={form}
                        name="newPassword"
                        label="New Password"
                        icon={newPassword.icon}
                        type={newPassword.type}
                    />
                    <FormFieldContainer
                        form={form}
                        name="confirmPassword"
                        label="Confirm Password"
                        icon={confirmPassword.icon}
                        type={confirmPassword.type}
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

export default NewPassword