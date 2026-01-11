import { inventoryService } from "@/services/inventoryService";

export async function registerMovement(
    productId: string,
    quantity: number,
    type: "IN" | "OUT"
) {
    if (quantity <= 0) {
        throw new Error("Quantity must be greater than zero");
    }

    await inventoryService.registerMovement({
        productId,
        quantity,
        movementType: type,
    });
}