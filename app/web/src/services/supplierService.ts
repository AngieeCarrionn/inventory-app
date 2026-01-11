import { apiClient } from "@/lib/apiClient";
import { Supplier } from "@/types/Supplier";

export const supplierService = {
    getAll(): Promise<Supplier[]> {
        return apiClient("/suppliers");
    },

    create(data: {
        name: string;
        address: {
            street: string;
            city: string;
            country: string;
        };
        contact: {
            email: string;
            phone: string;
        };
    }) {
        return apiClient("/suppliers", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },
};
