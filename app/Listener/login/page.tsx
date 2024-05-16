"use client"

import Link from "next/link"
import { AuthLayout } from "@/app/_layouts"
import { Form } from "@/components/ui/form"
import { LoginSchema } from "@/utils/schema"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { FormFieldContainer } from "@/app/_components"
import { useLogin, usePasswordVisibility } from "@/app/hooks"

const ListenerLogin = () => {
    const { icon, type } = usePasswordVisibility()

    const { onSubmit, form, formState } = useLogin(LoginSchema)
    return (
        <AuthLayout action="Log In" userType="Listener">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <div className="grid gap-4">
                        <FormFieldContainer
                            type="email"
                            label="Email"
                            form={form}
                            placeholder="johndoe@tunewish.co.uk"
                            name="email"
                        />

                        <FormFieldContainer
                            icon={icon}
                            type={type}
                            label="Password"
                            form={form}
                            name="password"
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={formState === "loading"}
                        >
                            {formState === "loading" && (
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {formState === "loading" ? "Logging in" : "Log In"}
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href={`/DJ/signup`} className="underline">
                            Sign Up
                        </Link>
                    </div>
                </form>
            </Form>
        </AuthLayout>
    )
}

export default ListenerLogin
