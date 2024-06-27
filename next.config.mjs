/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.app.goo.gl",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "i.scdn.co",
                port: "",
                pathname: "/**",
            },
        ],
    },

}

export default nextConfig
