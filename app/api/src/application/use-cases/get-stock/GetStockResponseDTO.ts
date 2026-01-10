/**
 * DTO de respuesta para consultar el stock de un producto.
 *
 * Representa la cantidad disponible de un producto específico.
 */
export interface GetStockResponseDTO {
    /**
     * Identificador del producto al que corresponde el stock.
     */
    productId: string;
    /**
       * Nombre del producto al que corresponde el stock.
       */
    productName: string;
    /**
     * Cantidad disponible en inventario. Debe ser un número entero >= 0.
     */
    quantity: number;
    /**
     * Ubicación del stock.
     */
    location: string;
}