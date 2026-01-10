import { Stock } from "./Stock";

/**
 * Repositorio para acceder y persistir los registros de `Stock`.
 *
 * Las implementaciones concretas (por ejemplo adaptadores de base de datos)
 * deben proporcionar estas operaciones para permitir que la lógica de dominio
 * interactúe con la capa de infraestructura de forma desacoplada.
 */
export interface StockRepository {
    /**
     * Busca el registro de stock asociado a un `productId`.
     * @param productId Identificador del producto.
     * @returns `Promise<Stock | null>` con el stock encontrado o `null` si no existe.
     */
    findByProductId(productId: string): Promise<Stock | null>;
    /**
     * Recupera todos los registros de stock.
     */
    findAll(): Promise<Stock[]>;
    /**
     * Persiste el estado del objeto `Stock`.
     * @param stock Instancia de `Stock` a guardar o actualizar.
     */
    save(stock: Stock): Promise<void>;
}
