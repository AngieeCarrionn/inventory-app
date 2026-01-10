import { InventoryMovement } from "./InventoryMovement";

export interface InventoryMovementRepository {
    save(movement: InventoryMovement): Promise<void>;
}