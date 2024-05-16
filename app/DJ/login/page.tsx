"use client"

import Link from "next/link"
import useLogin from "@/app/hooks/useLogin"
import { AuthLayout } from "@/app/_layouts"
import { Form } from "@/components/ui/form"
import { LoginSchema } from "@/utils/schema"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { usePasswordVisibility } from "@/app/hooks"
import { FormFieldContainer } from "@/app/_components"

const DJLogin = () => {
    const { icon, type } = usePasswordVisibility()
    const { onSubmit, form, formState } = useLogin(LoginSchema)

    return (
        <AuthLayout action="Log In" userType="DJ">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <div className="grid gap-4">
                        <FormFieldContainer
                            label="Email"
                            form={form}
                            type="email"
                            placeholder="johndoe@tunewish.co.uk"
                            name="email"
                        />

                        <FormFieldContainer
                            label="Password"
                            form={form}
                            name="password"
                            icon={icon}
                            type={type}
                        />
                        <Link
                            href="/forgot-password"
                            className="text-right text-xs underline"
                        >
                            Forgot Password?
                        </Link>
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

export default DJLogin
