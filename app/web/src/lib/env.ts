interface Env {
    API_URL: string;
    NODE_ENV: "development" | "production" | "test";
}

function getEnv(): Env {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const nodeEnv = process.env.NODE_ENV;

    if (!apiUrl) {
        throw new Error("❌ NEXT_PUBLIC_API_URL is not defined");
    }

    return {
        API_URL: apiUrl,
        NODE_ENV: (nodeEnv as Env["NODE_ENV"]) ?? "development",
    };
}

export const env = getEnv();
