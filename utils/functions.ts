export const getUrl = () => {
    let url = location.origin

    // Add trailing slash if not present
    if (!url.endsWith("/")) {
        url += "/"
    }

    url = url.endsWith("/") ? url : `${url}/`

    return url
}
