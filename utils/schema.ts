import { z } from "zod"

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

const SignupSchema = z
    .object({
        firstName: z.string().trim(),
        lastName: z.string().trim(),
        username: z.string().min(3).max(20).trim(),
        email: z.string().email().trim(),
        password: z
            .string()
            .min(8)
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\w).+$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
            ),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"], // path of error
    })

export { LoginSchema, SignupSchema }
