import { z } from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { signUp } from "@/supabase/client/authFunctions"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"

const useSignup = (schema: z.ZodSchema<any>, role: Roles) => {
    const { toast } = useToast()
    const [formState, setFormState] = useState<FormState>("idle")

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    })

    const onSubmit = async (values: z.infer<typeof schema>) => {
        const { email, password, confirmPassword, ...metadata } = values

        const fields = {
            email,
            password,
        }

        setFormState("loading")
        toast({
            title: "Creating Account",
            description: "Please wait while we create your account",
        })

        const { data, error } = await signUp(fields, role, metadata)
        if (error) {
            toast({
                title: "Error",
                description: "An Error occurred. Please try again later",
            })
            console.error(error)
            setFormState("error")
            return
        }

        if (data) {
            toast({
                title: "Account Created!",
                description: "Check your email to verify your account",
            })
            setFormState("error")
            return
        }

        setFormState("idle")
    }
    return { onSubmit, form, formState }
}
export default useSignup
