export interface InventoryMovement {
    productId: string;
    quantity: number;
    movementType: "IN" | "OUT";
    note?: string;
}
