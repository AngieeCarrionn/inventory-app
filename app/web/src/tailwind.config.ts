import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#6f17a6",
                danger: "#3f229e",
            },
        },
    },
    plugins: [],
};

export default config;
