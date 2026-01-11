import { InventoryMovementRepository } from "../../../domain/inventory-movement/InventoryMovementRepository";
import { GetInventoryMovementsResponseDTO } from "./GetInventoryMovementsResponseDTO";

/**
 * Caso de uso: Obtener movimientos de inventario.
 *
 * Permite listar todos los movimientos o filtrar
 * por producto.
 */
export class GetInventoryMovementsUseCase {
    constructor(
        private inventoryMovementRepository: InventoryMovementRepository
    ) { }

    async execute(
        productId?: string
    ): Promise<GetInventoryMovementsResponseDTO[]> {
        // Obtener movimientos desde el repositorio
        const movements = productId
            ? await this.inventoryMovementRepository.findByProductId(productId)
            : await this.inventoryMovementRepository.findAll();

        // Mapear entidades a DTOs
        return movements.map((movement) => ({
            id: movement.getId(),
            productId: movement.getProductId(),
            type: movement.getType(),
            quantity: movement.getQuantity(),
            note: movement.getNote(),
            date: movement.getDate()
        }));
    }
}
