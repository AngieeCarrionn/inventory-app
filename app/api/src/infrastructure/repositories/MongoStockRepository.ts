import { StockRepository } from "../../domain/stock/StockRepository";
import { Stock } from "../../domain/stock/Stock";
import { getCollections } from "../db/mongo/collections";

export class MongoStockRepository implements StockRepository {
    async findByProductId(productId: string): Promise<Stock | null> {
        const { stockCollection } = await getCollections();

        const doc = await stockCollection.findOne({ productId });
        if (!doc) return null;

        return new Stock(doc.productId, doc.quantity);
    }

    async save(stock: Stock): Promise<void> {
        const { stockCollection } = await getCollections();

        await stockCollection.updateOne(
            { productId: stock.productId },
            {
                $set: {
                    quantity: stock.getQuantity(),
                    updatedAt: new Date()
                },
                $setOnInsert: {
                    createdAt: new Date(),
                    location: "Bodega Central"
                }
            },
            { upsert: true }
        );
    }
}
