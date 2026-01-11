// src/infrastructure/db/mongo/collections.ts

import { Collection } from "mongodb";
import { connectMongo } from "./mongoClient";

/**
 * MongoDB document definitions
 * These are persistence models, NOT domain entities
 */

export interface ProductDocument {
    _id: string;
    name: string;
    description: string;
    price: number;
    supplierId: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface StockDocument {
    _id?: string;
    productId: string;
    quantity: number;
    location: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface InventoryMovementDocument {
    _id?: string;
    productId: string;
    quantity: number;
    movementType: "IN" | "OUT" | "SALE";
    note: string;
    createdAt: Date;
}

/**
 * Typed collections container
 */
export interface MongoCollections {
    productCollection: Collection<ProductDocument>;
    stockCollection: Collection<StockDocument>;
    movementCollection: Collection<InventoryMovementDocument>;
}

/**
 * Returns typed MongoDB collections.
 * Centralizes collection names and avoids magic strings.
 */
export async function getCollections(): Promise<MongoCollections> {
    const db = await connectMongo();

    return {
        productCollection: db.collection<ProductDocument>("products"),
        stockCollection: db.collection<StockDocument>("stocks"),
        movementCollection: db.collection<InventoryMovementDocument>(
            "inventory_movements"
        )
    };
}
