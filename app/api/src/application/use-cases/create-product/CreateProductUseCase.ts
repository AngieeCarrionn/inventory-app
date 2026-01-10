import { randomUUID } from "crypto";
import { Product } from "../../../domain/product/Product";
import { ProductRepository } from "../../../domain/product/ProductRepository";
import { Stock } from "../../../domain/stock/Stock";
import { StockRepository } from "../../../domain/stock/StockRepository";
import { CreateProductDTO } from "./CreateProductDTO";

/**
 * Caso de uso para crear un producto.
 *
 * Regla de negocio:
 * - Todo producto se crea con stock inicial 0
 * - El stock se crea en una ubicación por defecto ("MAIN")
 */
export class CreateProductUseCase {
    constructor(
        private productRepository: ProductRepository,
        private stockRepository: StockRepository
    ) { }

    async execute(dto: CreateProductDTO): Promise<{ id: string }> {
        // Crear producto
        const product = Product.create({
            id: randomUUID(),
            name: dto.name,
            description: dto.description,
            price: dto.price,
            supplierId: dto.supplierId
        });

        // Guardar producto
        await this.productRepository.save(product);

        // Crear stock inicial en 0 (ubicación por defecto)
        const stock = Stock.create({
            productId: product.getId(),
            quantity: 0,
            location: "MAIN"
        });

        await this.stockRepository.save(stock);

        // Devolver ID generado
        return {
            id: product.getId()
        };
    }
}
