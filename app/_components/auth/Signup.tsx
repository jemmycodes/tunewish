import Link from "next/link"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SignupProps {
    userType: "DJ" | "Listener"
}

const Signup = ({ userType }: SignupProps) => {
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <Link
                    className="text-right"
                    href={userType === "DJ" ? "/listener/signup" : "/DJ/signup"}
                >
                    <Badge variant="secondary">
                        Sign up as a {userType === "DJ" ? "Listener" : "DJ"}
                    </Badge>
                </Link>
                <CardTitle className="text-center text-xl">Signup</CardTitle>
                <CardDescription className="text-center">
                    Create a {userType} account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input id="first-name" placeholder="Max" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input
                                id="last-name"
                                placeholder="Robinson"
                                required
                            />
                        </div>
                    </div>
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
                        <Label htmlFor="email">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="djspinall"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="confirm-password">
                            Confirm Password
                        </Label>
                        <Input id="confirm-password" type="password" />
                    </div>

                    <Button type="submit" className="w-full">
                        Create an account
                    </Button>
                    <Button variant="outline" className="w-full">
                        Sign up with Google
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link
                        href={`/${userType === "Listener" && "listener"}/login`}
                        className="underline"
                    >
                        Log in
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

export default Signup
