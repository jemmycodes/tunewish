// import { cookies } from "next/headers"
// import { NextRequest } from "next/server"
// import { createSupabaseServerComponent } from "@/supabase/server"
//
// export async function GET(request: NextRequest) {
//     const cookie = cookies()
//
//     const {searchParams} = new URL(request.url)
//
//     const
//
//     const supabase = createSupabaseServerComponent(cookie)
//
//     const { data, error } = await supabase.from("profile").select("*").single()
//
//     if (error) {
//         return Response.json({
//             message: error.message || "An error occurred while fetching data",
//             error,
//         })
//     }
//
//     return Response.json({
//         message: "OK!",
//         data,
//     })
// }
