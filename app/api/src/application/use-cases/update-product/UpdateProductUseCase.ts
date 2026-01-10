import { ProductRepository } from "../../../domain/product/ProductRepository";
import { UpdateProductDTO } from "./UpdateProductDTO";

/**
 * Caso de uso: Actualizar un producto.
 *
 * Recupera un producto existente, actualiza sus datos
 * y persiste los cambios.
 */
export class UpdateProductUseCase {
    constructor(
        private productRepository: ProductRepository
    ) { }

    async execute(dto: UpdateProductDTO): Promise<void> {
        // Buscar el producto existente
        const product = await this.productRepository.findById(dto.id);

        if (!product) {
            throw new Error(`Product with id ${dto.id} not found`);
        }

        // Actualizar estado del dominio
        product.updateDetails({
            name: dto.name,
            description: dto.description,
            price: dto.price,
            supplierId: dto.supplierId
        });

        // 3️⃣ Persistir cambios
        await this.productRepository.update(product);
    }
}
