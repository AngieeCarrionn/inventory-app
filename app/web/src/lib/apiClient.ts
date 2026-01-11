const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiClient<T>(
    url: string,
    options?: RequestInit
): Promise<T> {

    if (!API_URL) {
        throw new Error("API URL is not defined");
    }

    const res = await fetch(`${API_URL}${url}`, {
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    });

    if (!res.ok) {
        const data = await res.json().catch(() => null);

        const message =
            data?.message ||
            data?.error ||
            "Unexpected API error";

        throw new Error(message);
    }

    return res.json();
}
