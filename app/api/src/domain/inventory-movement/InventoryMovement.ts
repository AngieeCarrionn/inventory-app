import { MovementType } from "./MovementType";

export class InventoryMovement {
    private constructor(
        private readonly id: string,
        private readonly productId: string,
        private readonly type: MovementType,
        private readonly quantity: number,
        private readonly date: Date
    ) { }

    static create(data: {
        id: string;
        productId: string;
        type: MovementType;
        quantity: number;
        date?: Date;
    }): InventoryMovement {
        return new InventoryMovement(
            data.id,
            data.productId,
            data.type,
            data.quantity,
            data.date ?? new Date()
        );
    }

    static rehydrate(data: {
        id: string;
        productId: string;
        type: MovementType;
        quantity: number;
        date: Date;
    }): InventoryMovement {
        return new InventoryMovement(
            data.id,
            data.productId,
            data.type,
            data.quantity,
            data.date
        );
    }

    // ✅ GETTERS (OBLIGATORIOS)
    getId(): string {
        return this.id;
    }

    getProductId(): string {
        return this.productId;
    }

    getType(): MovementType {
        return this.type;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getDate(): Date {
        return this.date;
    }
}
