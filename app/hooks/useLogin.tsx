import { z } from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { LoginSchema } from "@/utils/schema"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { logIn } from "@/supabase/client/authFunctions"

const useLogin = (schema: z.ZodSchema<any>) => {
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(LoginSchema),
    })

    const [formState, setFormState] = useState<FormState>("idle")

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
            router.push(`/${data.user.user_metadata.role}`)
        }
        setFormState("idle")
    }
    return { onSubmit, form, formState }
}

export default useLogin
