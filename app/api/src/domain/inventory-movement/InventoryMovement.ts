import { MovementType } from "./MovementType";

export class InventoryMovement {
    constructor(
        public readonly productId: string,
        public readonly quantity: number,
        public readonly movementType: MovementType,
        public readonly note?: string,
        public readonly createdAt: Date = new Date()
    ) {
        if (quantity <= 0) {
            throw new Error("Inventory movement quantity must be positive");
        }
    }
}