import { z } from "zod"

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

const SignupSchema = z
    .object({
        firstname: z.string().trim(),
        lastname: z.string().trim(),
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

const ForgotPasswordSchema = z.object({
    email: z.string().email(),
})

const NewPasswordSchema = z
    .object({
        newPassword: z
            .string()
            .min(8)
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\w).+$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
            ),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"], // path of error
    })

const CreateRoomSchema = z.object({
    location: z.string(),
    message: z.string().optional(),
    dress_code: z.string().optional(),
    name: z.string().min(3).max(20),
    description: z.string().min(10).max(500),
})

export {
    LoginSchema,
    SignupSchema,
    ForgotPasswordSchema,
    NewPasswordSchema,
    CreateRoomSchema,
}
