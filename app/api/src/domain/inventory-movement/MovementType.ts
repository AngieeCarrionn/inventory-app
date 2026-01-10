/**
 * Tipo que representa el tipo de movimiento de inventario.
 *
 * Valores permitidos:
 * - "IN":  Entrada de stock (por ejemplo, recepción).
 * - "OUT": Salida de stock (por ejemplo, ajuste/transferencia).
 * - "SALE": Venta que reduce el stock.
 *
 * Se utiliza para clasificar movimientos y aplicar reglas específicas según el tipo.
 */
export enum MovementType {
    IN = "IN",
    OUT = "OUT",
    SALE = "SALE"
}

