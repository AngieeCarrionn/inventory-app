import { ProductRepository } from "../../../domain/product/ProductRepository";
import { GetProductByIdResponseDTO } from "./GetProductByIdResponseDTO";

/**
 * Caso de uso: Obtener un producto por su identificador.
 *
 * Recupera la entidad `Product` mediante el `ProductRepository` y la
 * transforma en un `GetProductByIdResponseDTO` listo para la capa de
 * presentación.
 */
export class GetProductByIdUseCase {
    /**
     * @param productRepository Repositorio para acceder a productos.
     */
    constructor(
        private productRepository: ProductRepository
    ) { }

    /**
     * Ejecuta la operación de búsqueda de producto por ID.
     *
     * @param productId Identificador único del producto a buscar.
     * @throws {Error} Si el producto no existe.
     * @returns `Promise<GetProductByIdResponseDTO>` con los datos del producto.
     */
    async execute(productId: string): Promise<GetProductByIdResponseDTO> {
        // Buscar el producto en el repositorio
        const product = await this.productRepository.findById(productId);

        // Si no existe, se lanza un error para que la capa superior lo maneje
        if (!product) {
            throw new Error("Product not found");
        }

        // Mapear la entidad al DTO de respuesta
        return {
            id: product.id,
            name: product.getName(),
            description: product.getDescription(),
            price: product.getPrice(),
            supplierId: product.getSupplierId(),
            isActive: product.isActive()
        };

    }
}
