import { ProductRepository } from "../../../domain/product/ProductRepository";
import { GetProductByIdResponseDTO } from "./GetProductByIdResponseDTO";

export class GetProductByIdUseCase {
    constructor(
        private productRepository: ProductRepository
    ) { }

    async execute(productId: string): Promise<GetProductByIdResponseDTO> {
        const product = await this.productRepository.findById(productId);

        if (!product) {
            throw new Error("Product not found");
        }

        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            supplierId: product.supplierId,
            isActive: product.isActive
        };
    }
}
