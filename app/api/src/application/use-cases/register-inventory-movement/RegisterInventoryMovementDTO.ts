export interface RegisterInventoryMovementDTO {
    productId: string;
    quantity: number;
    movementType: "IN" | "OUT" | "SALE";
    note?: string;
}
