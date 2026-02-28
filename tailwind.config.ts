import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                surface: "var(--surface)",
                panel: "var(--panel)",
                muted: "var(--muted)",
                accent: {
                    DEFAULT: "var(--accent)",
                    hover: "var(--accent-hover)",
                }
            },
            fontFamily: {
                sans: ['var(--font-inter)'],
                heading: ['var(--font-outfit)'],
            },
        },
    },
    plugins: [],
};
export default config;
