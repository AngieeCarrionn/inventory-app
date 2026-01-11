import { apiClient } from "@/lib/apiClient";
import { InventoryMovement } from "@/types/InventoryMovement";
import { Stock } from "@/types/Stock";

export const inventoryService = {
    getStock(): Promise<Stock[]> {
        return apiClient<Stock[]>("/stocks");
    },

    registerMovement(data: {
        productId: string;
        quantity: number;
        movementType: "IN" | "OUT";
        note?: string;
    }) {
        return apiClient("/inventory/movements", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    getMovements(productId?: string): Promise<InventoryMovement[]> {
        const query = productId ? `?productId=${productId}` : "";
        return apiClient(`/inventory/movements${query}`);
    },
};
