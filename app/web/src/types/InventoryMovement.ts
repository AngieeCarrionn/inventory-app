export type MovementType = "IN" | "OUT";

export interface InventoryMovement {
    id: string;
    productId: string;
    quantity: number;
    movementType: MovementType;
    createdAt: string;
}
