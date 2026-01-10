import { randomUUID } from "crypto";
import { Product } from "../../../domain/product/Product";
import { ProductRepository } from "../../../domain/product/ProductRepository";
import { Stock } from "../../../domain/stock/Stock";
import { StockRepository } from "../../../domain/stock/StockRepository";
import { SupplierRepository } from "../../../domain/supplier/SupplierRepository";
import { CreateProductDTO } from "./CreateProductDTO";

/**
 * Caso de uso para crear un producto.
 *
 * Reglas de negocio:
 * - Todo producto se crea con stock inicial 0
 * - El stock se crea en una ubicación por defecto ("MAIN")
 * - Si se informa supplierId, el proveedor debe existir
 */
export class CreateProductUseCase {
    constructor(
        private productRepository: ProductRepository,
        private stockRepository: StockRepository,
        private supplierRepository: SupplierRepository
    ) { }

    async execute(dto: CreateProductDTO): Promise<{ id: string }> {
        /**
         * =========================
         * Validar proveedor (opcional)
         * =========================
         */
        if (dto.supplierId) {
            const supplier = await this.supplierRepository.findById(
                dto.supplierId
            );

            if (!supplier) {
                throw new Error("Supplier not found");
            }
        }

        /**
         * =========================
         * Crear producto
         * =========================
         */
        const product = Product.create({
            id: randomUUID(),
            name: dto.name,
            description: dto.description,
            price: dto.price,
            supplierId: dto.supplierId
        });

        await this.productRepository.save(product);

        /**
         * =========================
         * Crear stock inicial
         * =========================
         */
        const stock = Stock.create({
            productId: product.getId(),
            quantity: 0,
            location: "MAIN"
        });

        await this.stockRepository.save(stock);

        return {
            id: product.getId()
        };
    }
}
