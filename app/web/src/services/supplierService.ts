import { apiClient } from "@/lib/apiClient";
import { Supplier } from "@/types/Supplier";

export const supplierService = {
    getAll(): Promise<Supplier[]> {
        return apiClient("/suppliers");
    },

    create(data: Partial<Supplier>) {
        return apiClient("/suppliers", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },
};
