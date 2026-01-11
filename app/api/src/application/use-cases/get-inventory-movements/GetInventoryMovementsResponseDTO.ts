import { MovementType } from "../../../domain/inventory-movement/MovementType";

/**
 * DTO de respuesta para un movimiento de inventario.
 */
export interface GetInventoryMovementsResponseDTO {
    id: string;
    productId: string;
    type: MovementType;
    quantity: number;
    note?: string;
    date?: Date;
}
