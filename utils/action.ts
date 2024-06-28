// import { redirect } from "next/navigation"
// import { supabase } from "@/supabase/client"
//
// export const checkRole = async (searchParams: URLSearchParams) => {
//     const { data, error } = await supabase.auth.getUser()
//
//     console.log(error, data)
//
//     if (!data) return redirect("/login")
//     if (error) throw new Error("An error occurred while fetching user role")
//
//     const params = new URLSearchParams(searchParams)
//     params.set("role", user.user_metadata.role)
//     console.log(params.toString())
//     redirect(`/?${params.toString()}`)
// }
