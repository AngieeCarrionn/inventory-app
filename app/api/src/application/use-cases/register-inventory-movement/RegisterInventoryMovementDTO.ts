/**
 * DTO para registrar un movimiento de inventario.
 *
 * Contiene los datos necesarios para crear un movimiento (entrada, salida o venta)
 * asociado a un producto.
 */
export interface RegisterInventoryMovementDTO {
    /**
     * Identificador del producto afectado por el movimiento.
     */
    productId: string;

    /**
     * Cantidad involucrada en el movimiento. Debe ser un número positivo.
     */
    quantity: number;

    /**
     * Tipo de movimiento:
     * - "IN": ingreso de stock
     * - "OUT": salida de stock (ajuste, devolución, etc.)
     * - "SALE": salida por venta
     */
    movementType: "IN" | "OUT" | "SALE";

    /**
     * Nota opcional para describir el motivo o contexto del movimiento.
     */
    note?: string;
}
