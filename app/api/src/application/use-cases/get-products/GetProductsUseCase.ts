import { ProductRepository } from "../../../domain/product/ProductRepository";
import { GetProductsResponseDTO } from "./GetProductsResponseDTO";

/**
 * Caso de uso: Obtener listado de productos.
 *
 * Permite listar todos los productos o filtrar
 * por estado activo/inactivo.
 */
export class GetProductsUseCase {
    constructor(
        private productRepository: ProductRepository
    ) { }

    async execute(
        active?: boolean
    ): Promise<GetProductsResponseDTO[]> {
        // Obtener productos desde el repositorio
        const products = await this.productRepository.findAll();


        // Mapear entidades a DTOs
        return products.map((product) => ({
            id: product.getId(),
            name: product.getName(),
            description: product.getDescription(),
            price: product.getPrice(),
            supplierId: product.getSupplierId(),
            isActive: product.isActive()
        }));
    }
}
