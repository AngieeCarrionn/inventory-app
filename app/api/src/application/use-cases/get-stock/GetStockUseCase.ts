import { StockRepository } from "../../../domain/stock/StockRepository";

export class GetStockUseCase {
    constructor(
        private stockRepository: StockRepository
    ) { }

    async execute(productId: string) {
        const stock = await this.stockRepository.findByProductId(productId);

        if (!stock) {
            throw new Error("Stock not found");
        }

        return {
            productId,
            quantity: stock.getQuantity()
        };
    }
}
