import { StockRepository } from "../../../domain/stock/StockRepository";
import { ProductRepository } from "../../../domain/product/ProductRepository";
import { GetStockResponseDTO } from "./GetStockResponseDTO";

/**
 * Caso de uso: Obtener información de stock.
 *
 * Soporta dos modos de operación:
 * - Si se proporciona `productId`, devuelve el stock del producto solicitado.
 * - Si no se proporciona `productId`, devuelve el stock global (lista de stocks).
 */
export class GetStockUseCase {
    constructor(
        private stockRepository: StockRepository,
        private productRepository: ProductRepository
    ) { }

    async execute(
        productId?: string
    ): Promise<GetStockResponseDTO | GetStockResponseDTO[]> {

        /**
         * =========================
         * Stock por producto
         * =========================
         */
        if (productId) {
            const stock = await this.stockRepository.findByProductId(productId);

            if (!stock) {
                throw new Error("Stock not found");
            }

            const product = await this.productRepository.findById(
                stock.getProductId()
            );

            return {
                productId: stock.getProductId(),
                productName: product?.getName() ?? "Unknown product",
                quantity: stock.getQuantity(),
                location: stock.getLocation()
            };
        }

        /**
         * =========================
         * Stock global
         * =========================
         */
        const stocks = await this.stockRepository.findAll();

        return Promise.all(
            stocks.map(async stock => {
                const product = await this.productRepository.findById(
                    stock.getProductId()
                );

                return {
                    productId: stock.getProductId(),
                    productName: product?.getName() ?? "Unknown product",
                    quantity: stock.getQuantity(),
                    location: stock.getLocation()
                };
            })
        );
    }
}
