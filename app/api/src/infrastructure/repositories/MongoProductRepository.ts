import { ProductRepository } from "../../domain/product/ProductRepository";
import { Product } from "../../domain/product/Product";
import { getCollections } from "../db/mongo/collections";

export class MongoProductRepository implements ProductRepository {

    async save(product: Product): Promise<void> {
        const { productCollection } = await getCollections();

        await productCollection.insertOne({
            _id: product.getId(),
            name: product.getName(),
            description: product.getDescription(),
            price: product.getPrice(),
            supplierId: product.getSupplierId(),
            isActive: product.isActive(),
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }

    async update(product: Product): Promise<void> {
        const { productCollection } = await getCollections();

        await productCollection.updateOne(
            { _id: product.getId() },
            {
                $set: {
                    name: product.getName(),
                    description: product.getDescription(),
                    price: product.getPrice(),
                    supplierId: product.getSupplierId(),
                    isActive: product.isActive(),
                    updatedAt: new Date()
                }
            }
        );
    }

    async findById(id: string): Promise<Product | null> {
        const { productCollection } = await getCollections();

        const doc = await productCollection.findOne({ _id: id });
        if (!doc) return null;

        return Product.rehydrate({
            id: doc._id,
            name: doc.name,
            description: doc.description,
            price: doc.price,
            supplierId: doc.supplierId,
            isActive: doc.isActive
        });
    }

    async findAll(): Promise<Product[]> {
        const { productCollection } = await getCollections();

        const docs = await productCollection.find().toArray();

        return docs.map(doc =>
            Product.rehydrate({
                id: doc._id,
                name: doc.name,
                description: doc.description,
                price: doc.price,
                supplierId: doc.supplierId,
                isActive: doc.isActive
            })
        );
    }
}
