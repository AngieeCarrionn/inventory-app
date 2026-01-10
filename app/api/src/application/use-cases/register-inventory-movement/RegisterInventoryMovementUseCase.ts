import { StockRepository } from "../../../domain/stock/StockRepository";
import { InventoryMovement } from "../../../domain/inventory-movement/InventoryMovement";
import { RegisterInventoryMovementDTO } from "./RegisterInventoryMovementDTO";
import { InventoryMovementRepository } from "../../../domain/inventory-movement/InventoryMovementRepository";

export class RegisterInventoryMovementUseCase {
    constructor(
        private stockRepository: StockRepository,
        private movementRepository: InventoryMovementRepository
    ) { }

    async execute(dto: RegisterInventoryMovementDTO): Promise<void> {
        // Obtener stock actual
        const stock = await this.stockRepository.findByProductId(dto.productId);

        if (!stock) {
            throw new Error("Stock not found");
        }

        // Aplicar regla de negocio
        if (dto.movementType === "IN") {
            stock.increase(dto.quantity);
        } else {
            // OUT o SALE
            stock.decrease(dto.quantity);
        }

        // Persistir nuevo estado del stock
        await this.stockRepository.save(stock);

        // Registrar movimiento (historial)
        const movement = new InventoryMovement(
            dto.productId,
            dto.quantity,
            dto.movementType,
            dto.note
        );

        await this.movementRepository.save(movement);
    }
}
