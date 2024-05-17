export const getUrl = () => {
    const site = location.origin

    let url =
        process.env.NEXT_PUBLIC_SITE_URL! ?? // Set this to your site URL in production env.
        process.env.NEXT_PUBLIC_VERCEL_URL! ?? // Automatically set by Vercel.
        site

    //  includes `https://` when not localhost.
    url = url.includes("http") ? url : `https://${url}`

    // Add trailing slash if not present
    if (!url.endsWith("/")) {
        url += "/"
    }

    url = url.endsWith("/") ? url : `${url}/`

    return url
}
