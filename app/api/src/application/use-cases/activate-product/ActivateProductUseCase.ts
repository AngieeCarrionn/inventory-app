import { ProductRepository } from "../../../domain/product/ProductRepository";
import { ActivateProductDTO } from "./ActivateProductDTO";

/**
 * Caso de uso: Activar un producto.
 *
 * Marca un producto existente como inactivo, sin eliminarlo,
 * para preservar la integridad histórica del inventario.
 */
export class ActivateProductUseCase {
    constructor(
        private productRepository: ProductRepository
    ) { }

    async execute(dto: ActivateProductDTO): Promise<void> {
        // Buscar el producto existente
        const product = await this.productRepository.findById(dto.productId);

        if (!product) {
            throw new Error(`Product with id ${dto.productId} not found`);
        }

        // Cambiar estado de dominio
        product.activate();

        // Persistir cambios
        await this.productRepository.update(product);
    }
}
