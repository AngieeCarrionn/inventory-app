/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly MODE: "development" | "production" | "test";
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
