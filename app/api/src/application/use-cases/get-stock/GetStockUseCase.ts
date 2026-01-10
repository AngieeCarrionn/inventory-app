import { StockRepository } from "../../../domain/stock/StockRepository";
import { GetStockResponseDTO } from "./GetStockResponseDTO";

/**
 * Caso de uso: Obtener información de stock.
 *
 * Soporta dos modos de operación:
 * - Si se proporciona `productId`, devuelve el stock del producto solicitado.
 * - Si no se proporciona `productId`, devuelve el stock global (lista de stocks).
 */
export class GetStockUseCase {
    /**
     * @param stockRepository Repositorio para acceder a datos de stock.
     */
    constructor(
        private stockRepository: StockRepository
    ) { }

    /**
     * Ejecuta la consulta de stock.
     *
     * @param productId Opcional. Si se proporciona, se devuelve el `GetStockResponseDTO` para ese producto.
     * @throws {Error} Si se solicita un `productId` que no existe.
     * @returns `Promise<GetStockResponseDTO | GetStockResponseDTO[]>` con el resultado.
     */
    async execute(
        productId?: string
    ): Promise<GetStockResponseDTO | GetStockResponseDTO[]> {

        // Caso: stock por producto
        if (productId) {
            const stock = await this.stockRepository.findByProductId(productId);

            if (!stock) {
                throw new Error("Stock not found");
            }

            return {
                // Mapear la entidad `Stock` al DTO de respuesta
                productId: stock.getProductId(),
                quantity: stock.getQuantity(),
                location: stock.getLocation()
            };
        }

        // Caso: stock global
        const stocks = await this.stockRepository.findAll();

        return stocks.map(stock => ({
            productId: stock.getProductId(),
            quantity: stock.getQuantity(),
            location: stock.getLocation()
        }));
    }
}
