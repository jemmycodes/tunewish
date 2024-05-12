"use client"

import { z } from "zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { AuthLayout } from "@/app/_layouts"
import { SignupSchema } from "@/utils/schema"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormFieldContainer } from "@/app/_components"
import { Form } from "@/components/ui/form"

const DJSignup = () => {
    const form = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
    })

    const onSubmit = (values: z.infer<typeof SignupSchema>) => {
        console.log(values)
    }
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
                                name="firstName"
                            />
                            <FormFieldContainer
                                label="Lastname"
                                form={form}
                                placeholder="Doe"
                                name="lastName"
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
                        <Button type="submit" className="w-full">
                            Sign Up
                        </Button>
                        <Button variant="outline" className="w-full">
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
