import { randomUUID } from "crypto";
import { Product } from "../../../domain/product/Product";
import { ProductRepository } from "../../../domain/product/ProductRepository";
import { CreateProductDTO } from "./CreateProductDTO";

export class CreateProductUseCase {
    constructor(
        private productRepository: ProductRepository
    ) { }

    async execute(dto: CreateProductDTO): Promise<void> {
        const product = new Product(
            randomUUID(),// Id generado por el sistema
            dto.name,
            dto.description,
            dto.price,
            dto.supplierId,
            true
        );

        await this.productRepository.save(product);
    }
}
