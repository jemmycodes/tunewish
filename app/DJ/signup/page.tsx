"use client"

import Link from "next/link"
import { useSignup } from "@/app/hooks"
import { Form } from "@/components/ui/form"
import { AuthLayout } from "@/app/_layouts"
import { SignupSchema } from "@/utils/schema"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { FormFieldContainer } from "@/app/_components"

const DJSignup = () => {
    const { onSubmit, form, formState } = useSignup(SignupSchema, "DJ")

    return (
        <AuthLayout userType="DJ" action="Sign Up">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormFieldContainer
                                label="Firstname"
                                form={form}
                                placeholder="John"
                                name="firstname"
                            />
                            <FormFieldContainer
                                label="Lastname"
                                form={form}
                                placeholder="Doe"
                                name="lastname"
                            />
                        </div>
                        <FormFieldContainer
                            label="Email"
                            form={form}
                            placeholder="johndoe@tunewish.co.uk"
                            name="email"
                        />
                        <FormFieldContainer
                            label="Username"
                            form={form}
                            placeholder="@johnddoe"
                            name="username"
                        />
                        <FormFieldContainer
                            label="Password"
                            form={form}
                            name="password"
                        />
                        <FormFieldContainer
                            label="Confirm Password"
                            form={form}
                            name="confirmPassword"
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={formState === "loading"}
                        >
                            {formState === "loading" && (
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {formState === "loading"
                                ? "Creating Account"
                                : "Sign Up"}
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full"
                            disabled={formState === "loading"}
                        >
                            Sign Up with Google
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Have an account?{" "}
                        <Link href={`/DJ/login`} className="underline">
                            Log in
                        </Link>
                    </div>
                </form>
            </Form>
        </AuthLayout>
    )
}

export default DJSignup
