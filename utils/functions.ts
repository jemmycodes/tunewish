export const getUrl = () => {
    let url = location.origin

    // Add trailing slash if not present
    if (!url.endsWith("/")) {
        url += "/"
    }

    url = url.endsWith("/") ? url : `${url}/`

    return url
}

export const getInitials = (firstname: string, lastname: string) => {
    const lastInitial = lastname.charAt(0).toUpperCase()
    const firstInitial = firstname.charAt(0).toUpperCase()

    return `${firstInitial}${lastInitial}`
}
