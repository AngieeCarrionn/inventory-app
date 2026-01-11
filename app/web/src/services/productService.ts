import { apiClient } from "@/lib/apiClient";
import { Product } from "@/types/Product";

export const productService = {
    getAll(): Promise<Product[]> {
        return apiClient("/products");
    },

    getById(id: string): Promise<Product> {
        return apiClient(`/products/${id}`);
    },

    create(data: Partial<Product>) {
        return apiClient("/products", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    activate(id: string) {
        return apiClient(`/products/${id}/activate`, { method: "PATCH" });
    },

    deactivate(id: string) {
        return apiClient(`/products/${id}/deactivate`, { method: "PATCH" });
    },
};
