import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./_components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            // colors: {
            //     purple: {
            //     "dark": "#200D42",
            //     "light": "#4F21A1",
            //         "lighter": "#A46EDB"
            //
            //     }
            // },
            backgroundImage: {
                "purple-gradient":
                    "linear-gradient(180deg, #000000 0%, #200D42 34.22%, #4F21A1 64.9%, #A46EDB 81.78%)",

                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
}
export default config
