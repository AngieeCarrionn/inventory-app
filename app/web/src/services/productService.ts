import { Product } from "@/types/Product";
import { env } from "@/lib/env";

export async function getProductById(id: string): Promise<Product> {
    const res = await fetch(`${env.API_URL}/products/${id}`);

    if (!res.ok) {
        throw new Error("Error fetching product");
    }

    return res.json();
}
