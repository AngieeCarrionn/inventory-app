import { InventoryMovementRepository } from "../../domain/inventory-movement/InventoryMovementRepository";
import { InventoryMovement } from "../../domain/inventory-movement/InventoryMovement";
import { getCollections } from "../db/mongo/collections";
import { MovementType } from "../../domain/inventory-movement/MovementType";

export class MongoInventoryMovementRepository
    implements InventoryMovementRepository {

    async save(movement: InventoryMovement): Promise<void> {
        const { movementCollection } = await getCollections();

        await movementCollection.insertOne({
            _id: movement.getId(),               // ✅ string
            productId: movement.getProductId(),
            quantity: movement.getQuantity(),
            movementType: movement.getType(),    // enum → string
            createdAt: movement.getDate()
        });
    }

    async findAll(): Promise<InventoryMovement[]> {
        const { movementCollection } = await getCollections();

        const docs = await movementCollection.find().toArray();

        return docs.map(doc =>
            InventoryMovement.rehydrate({
                id: doc._id,
                productId: doc.productId,
                type: doc.movementType as MovementType, // ✅ conversión
                quantity: doc.quantity,
                date: doc.createdAt
            })
        );
    }

    async findByProductId(productId: string): Promise<InventoryMovement[]> {
        const { movementCollection } = await getCollections();

        const docs = await movementCollection
            .find({ productId })
            .sort({ createdAt: -1 })
            .toArray();

        return docs.map(doc =>
            InventoryMovement.rehydrate({
                id: doc._id,
                productId: doc.productId,
                type: doc.movementType as MovementType, // ✅ conversión
                quantity: doc.quantity,
                date: doc.createdAt
            })
        );
    }
}
