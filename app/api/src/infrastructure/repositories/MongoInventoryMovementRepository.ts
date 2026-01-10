import { InventoryMovementRepository } from "../../domain/inventory-movement/InventoryMovementRepository";
import { InventoryMovement } from "../../domain/inventory-movement/InventoryMovement";
import { getCollections } from "../db/mongo/collections";

export class MongoInventoryMovementRepository
    implements InventoryMovementRepository {

    async save(movement: InventoryMovement): Promise<void> {
        const { movementCollection } = await getCollections();

        await movementCollection.insertOne({
            productId: movement.productId,
            quantity: movement.quantity,
            movementType: movement.movementType,
            note: movement.note,
            createdAt: movement.createdAt
        });
    }
}
