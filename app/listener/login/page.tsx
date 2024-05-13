"use client"

import Link from "next/link"
import { useLogin } from "@/app/hooks"
import { AuthLayout } from "@/app/_layouts"
import { Form } from "@/components/ui/form"
import { LoginSchema } from "@/utils/schema"
import { Button } from "@/components/ui/button"
import { FormFieldContainer } from "@/app/_components"
import { ReloadIcon } from "@radix-ui/react-icons"

const DJLogin = () => {
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
                            label="Email"
                            form={form}
                            placeholder="johndoe@tunewish.co.uk"
                            name="email"
                        />

                        <FormFieldContainer
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
                        <Button
                            variant="outline"
                            className="w-full"
                            disabled={formState === "loading"}
                        >
                            Log in with Google
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
