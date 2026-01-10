import { InventoryMovement } from "./InventoryMovement";
/**
 * Repositorio para persistencia de movimientos de inventario.
 *
 * Esta interfaz define la abstracción que deben implementar las infraestructuras
 * (por ejemplo, repositorios Mongo, SQL, etc.) para guardar movimientos de inventario
 * generados por la aplicación.
 */
export interface InventoryMovementRepository {
    /**
     * Persiste un movimiento de inventario.
     *
     * @param movement Movimiento de inventario a guardar.
     * @returns Promise resuelta cuando la operación finaliza.
     * @throws Error en caso de fallo de persistencia.
     */
    save(movement: InventoryMovement): Promise<void>;
    findAll(): Promise<InventoryMovement[]>;
    findByProductId(productId: string): Promise<InventoryMovement[]>;
}