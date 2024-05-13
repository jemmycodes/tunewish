import { z } from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpAsDJ } from "@/supabase/serverActions"

const useSignup = (schema: z.ZodSchema<any>) => {
    const { toast } = useToast()
    const [formState, setFormState] = useState<
        "idle" | "loading" | "error" | "success"
    >("idle")

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    })

    const onSubmit = async (fields: z.infer<typeof schema>) => {
        setFormState("loading")
        toast({
            title: "Creating Account",
            description: "Please wait while we create your account",
        })

        const { data, error } = await signUpAsDJ(fields)
        if (error) {
            toast({
                title: "Error",
                description: "An Error occurred. Please try again later",
            })
            console.error(error)
            setFormState("error")
            return
        }

        if (data.user && !data.session) {
            toast({
                title: "One step to go!",
                description:
                    "Account already created, please check your email to verify your account",
            })
            setFormState("error")
            return
        }

        if (data.user && data.session) {
            toast({
                title: "Success!",
                description:
                    "Account created successfully, Please wait while we redirect you to your dashboard",
            })
            setFormState("success")
            return
        }

        setFormState("idle")
    }
    return { onSubmit, form, formState }
}
export default useSignup
