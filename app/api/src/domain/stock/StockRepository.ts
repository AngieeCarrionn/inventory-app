import { Stock } from "./Stock";

export interface StockRepository {
    findByProductId(productId: string): Promise<Stock | null>;
    save(stock: Stock): Promise<void>;
}
