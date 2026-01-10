import { StockRepository } from "../../domain/stock/StockRepository";
import { Stock } from "../../domain/stock/Stock";
import { getCollections } from "../db/mongo/collections";

export class MongoStockRepository implements StockRepository {

    async findByProductId(productId: string): Promise<Stock | null> {
        const { stockCollection } = await getCollections();

        const doc = await stockCollection.findOne({ productId });
        if (!doc) return null;

        return Stock.rehydrate({
            productId: doc.productId,
            quantity: doc.quantity,
            location: doc.location
        });
    }

    async findAll(): Promise<Stock[]> {
        const { stockCollection } = await getCollections();

        const docs = await stockCollection.find().toArray();

        return docs.map(doc =>
            Stock.rehydrate({
                productId: doc.productId,
                quantity: doc.quantity,
                location: doc.location
            })
        );
    }

    async save(stock: Stock): Promise<void> {
        const { stockCollection } = await getCollections();

        await stockCollection.updateOne(
            { productId: stock.getProductId() },
            {
                $set: {
                    quantity: stock.getQuantity(),
                    location: stock.getLocation(),
                    updatedAt: new Date()
                },
                $setOnInsert: {
                    createdAt: new Date()
                }
            },
            { upsert: true }
        );
    }
}
