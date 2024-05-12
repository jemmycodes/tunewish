import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

const Login = ({ userType }: { userType: "DJ" | "Listener" }) => {
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <Link
                    className="text-right"
                    href={userType === "DJ" ? "/listener/login" : "/DJ/login"}
                >
                    <Badge variant="secondary">
                        Log in as {userType === "DJ" ? "Listener" : "DJ"}
                    </Badge>
                </Link>
                <CardTitle className="text-center text-2xl">Login</CardTitle>
                <CardDescription className="max-w-xs text-center">
                    Enter your email to login to your {userType} account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                href="#"
                                className="ml-auto inline-block text-sm underline"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                        <Input id="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                    <Button variant="outline" className="w-full">
                        Login with Google
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href={`/${userType}/signup`} className="underline">
                        Sign up
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

export default Login
