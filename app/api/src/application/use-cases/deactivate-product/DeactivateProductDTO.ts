/**
 * Data Transfer Object (DTO) para desactivar un producto.
 *
 * Contiene únicamente el identificador del producto
 * que será marcado como inactivo.
 */
export interface DeactivateProductDTO {
    /**
     * Identificador único del producto a desactivar.
     */
    productId: string;
}
