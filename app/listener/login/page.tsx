"use client"

import { z } from "zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { AuthLayout } from "@/app/_layouts"
import { Form } from "@/components/ui/form"
import { LoginSchema } from "@/utils/schema"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormFieldContainer } from "@/app/_components"

const DJLogin = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        console.log(values)
    }
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

                        <Button type="submit" className="w-full">
                            Log in
                        </Button>
                        <Button variant="outline" className="w-full">
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
