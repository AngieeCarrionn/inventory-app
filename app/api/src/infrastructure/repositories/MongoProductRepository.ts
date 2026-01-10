import { ProductRepository } from "../../domain/product/ProductRepository";
import { Product } from "../../domain/product/Product";
import { getCollections } from "../db/mongo/collections";

export class MongoProductRepository implements ProductRepository {
    async save(product: Product): Promise<void> {
        const { productCollection } = await getCollections();

        await productCollection.updateOne(
            { _id: product.id },
            {
                $set: {
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    supplierId: product.supplierId,
                    isActive: product.isActive,
                    updatedAt: new Date()
                },
                $setOnInsert: {
                    createdAt: new Date()
                }
            },
            { upsert: true }
        );
    }

    async findById(id: string): Promise<Product | null> {
        const { productCollection } = await getCollections();

        const doc = await productCollection.findOne({ _id: id });
        if (!doc) return null;

        return new Product(
            doc._id,
            doc.name,
            doc.description,
            doc.price,
            doc.supplierId,
            doc.isActive
        );
    }
}
