export type MovementType = "IN" | "OUT";

export interface InventoryMovement {
    id: string;
    productId: string;
    type: "IN" | "OUT" | "SALE" | "ADJUST";
    quantity: number;
    date: string;
    note: string
}
