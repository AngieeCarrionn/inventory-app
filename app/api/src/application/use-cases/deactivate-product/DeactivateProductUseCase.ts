import { ProductRepository } from "../../../domain/product/ProductRepository";
import { DeactivateProductDTO } from "./DeactivateProductDTO";

/**
 * Caso de uso: Desactivar un producto.
 *
 * Marca un producto existente como inactivo, sin eliminarlo,
 * para preservar la integridad histórica del inventario.
 */
export class DeactivateProductUseCase {
    constructor(
        private productRepository: ProductRepository
    ) { }

    async execute(dto: DeactivateProductDTO): Promise<void> {
        // Buscar el producto existente
        const product = await this.productRepository.findById(dto.productId);

        if (!product) {
            throw new Error(`Product with id ${dto.productId} not found`);
        }

        // Cambiar estado de dominio
        product.deactivate();

        // Persistir cambios
        await this.productRepository.update(product);
    }
}
