import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { ReactNode } from "react"
import { Input } from "@/components/ui/input"

interface FormFieldProps {
    form: any
    name: string
    type?: string
    label: string
    icon?: ReactNode
    className?: string
    placeholder?: string
}

const FormFieldContainer = ({
    form,
    type,
    icon,
    name,
    label,
    className,
    placeholder,
}: FormFieldProps) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input
                                className={className}
                                placeholder={placeholder}
                                {...field}
                                type={type}
                            />
                            {icon}
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default FormFieldContainer
