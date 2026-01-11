import { randomUUID } from "crypto";

import { StockRepository } from "../../../domain/stock/StockRepository";
import { ProductRepository } from "../../../domain/product/ProductRepository";
import { InventoryMovement } from "../../../domain/inventory-movement/InventoryMovement";
import { InventoryMovementRepository } from "../../../domain/inventory-movement/InventoryMovementRepository";
import { RegisterInventoryMovementDTO } from "./RegisterInventoryMovementDTO";
import { MovementType } from "../../../domain/inventory-movement/MovementType";

export class RegisterInventoryMovementUseCase {
    constructor(
        private readonly stockRepository: StockRepository,
        private readonly movementRepository: InventoryMovementRepository,
        private readonly productRepository: ProductRepository
    ) { }

    async execute(dto: RegisterInventoryMovementDTO): Promise<void> {
        // Obtener stock
        const stock = await this.stockRepository.findByProductId(dto.productId);

        if (!stock) {
            throw new Error("Stock not found");
        }

        // Regla de negocio: no vender producto inactivo
        if (dto.movementType === "SALE") {
            const product = await this.productRepository.findById(dto.productId);
            if (product != null && !product.isActive()) {
                throw new Error("Product is inactive and cannot be sold");
            }
            if (!product) {
                throw new Error("Product not found");
            }


        }

        // Aplicar movimiento al stock
        if (dto.movementType === "IN") {
            stock.increase(dto.quantity);
        } else {
            // OUT | SALE | ADJUST
            stock.decrease(dto.quantity);
        }

        // Persistir nuevo stock
        await this.stockRepository.save(stock);

        // Registrar movimiento (historial)
        const movement = InventoryMovement.create({
            id: randomUUID(),
            productId: dto.productId,
            type: dto.movementType as MovementType,
            quantity: dto.quantity,
            note: dto.note ?? "", // opcional
        });

        await this.movementRepository.save(movement);
    }
}