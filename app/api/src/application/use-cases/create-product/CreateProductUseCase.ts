import { randomUUID } from "crypto";
import { Product } from "../../../domain/product/Product";
import { ProductRepository } from "../../../domain/product/ProductRepository";
import { CreateProductDTO } from "./CreateProductDTO";

/**
 * Caso de uso: Crear un producto.
 *
 * Construye una entidad `Product` a partir del `CreateProductDTO`, asigna
 * un identificador generado por el sistema y delega la persistencia al
 * `ProductRepository`.
 */
export class CreateProductUseCase {
    /**
     * @param productRepository Repositorio para persistir la entidad `Product`.
     */
    constructor(
        private productRepository: ProductRepository
    ) { }

    /**
     * Ejecuta el caso de uso de creación de producto.
     *
     * @param dto Objeto con los datos necesarios para crear el producto.
     * @returns `Promise<void>` una vez que el producto ha sido guardado.
     */
    async execute(dto: CreateProductDTO): Promise<void> {
        // Crear la entidad Product con ID generado por el sistema y estado activo
        const product = Product.create({
            id: randomUUID(),
            name: dto.name,
            description: dto.description,
            price: dto.price,
            supplierId: dto.supplierId
        });

        // Persistir el producto usando el repositorio proporcionado
        await this.productRepository.save(product);
    }
}
