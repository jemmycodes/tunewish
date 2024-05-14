import { z } from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { LoginSchema } from "@/utils/schema"
import { logIn } from "@/supabase/serverActions"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"

const useLogin = (schema: z.ZodSchema<any>) => {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(LoginSchema),
    })

    const [formState, setFormState] = useState<
        "idle" | "loading" | "error" | "success"
    >("idle")

    const onSubmit = async (values: z.infer<typeof schema>) => {
        setFormState("loading")
        toast({
            title: "Logging In",
            description: "Please wait while we log you in",
        })

        const { data, error } = await logIn(values)
        if (error) {
            toast({
                title: "Error",
                description: error.message,
            })
            setFormState("error")
            return
        }

        if (data.user && data.session) {
            toast({
                title: "Success!",
                description:
                    "Logged in successfully, Please wait while we redirect you to your dashboard",
            })
            setFormState("success")
        }
        setFormState("idle")
    }
    return { onSubmit, form, formState }
}

export default useLogin
