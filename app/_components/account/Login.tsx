import Link from "next/link"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { LoginSchema } from "@/utils/schema"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { FormFieldContainer } from "@/app/_components"
import { useLogin, usePasswordVisibility } from "@/app/hooks"

const Login = ({ role }: { role: Roles }) => {
    const { icon, type } = usePasswordVisibility()

    const { onSubmit, form, formState } = useLogin(LoginSchema)

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-center text-2xl">Log In</CardTitle>
                <CardDescription className="max-w-xs text-center">
                    Enter your email to log in to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
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
                                {formState === "loading"
                                    ? "Logging in"
                                    : "Log In"}
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link
                                href={`/account/${role}/signup`}
                                className="underline"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default Login
