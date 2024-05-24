import Link from "next/link"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { SignupSchema } from "@/utils/schema"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { FormFieldContainer } from "@/app/_components"
import { usePasswordVisibility, useSignup } from "@/app/hooks"

const Signup = ({ role }: { role: Roles }) => {
    const passwordVisibility = usePasswordVisibility()
    const confirmPasswordVisibility = usePasswordVisibility()
    const { onSubmit, form, formState } = useSignup(SignupSchema, role)

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-center text-2xl">Signup</CardTitle>
                <CardDescription className="max-w-xs text-center">
                    Enter your email to signup to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
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
                                type="email"
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
                                key="password"
                                label="Password"
                                form={form}
                                name="password"
                                icon={passwordVisibility.icon}
                                type={passwordVisibility.type}
                            />

                            <FormFieldContainer
                                key="confirmPassword"
                                label="Confirm Password"
                                form={form}
                                name="confirmPassword"
                                icon={confirmPasswordVisibility.icon}
                                type={confirmPasswordVisibility.type}
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
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Have an account?{" "}
                            <Link
                                href={`/account/${role}/login`}
                                className="underline"
                            >
                                Log in
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default Signup
