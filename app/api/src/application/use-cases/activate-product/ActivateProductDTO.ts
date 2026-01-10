/**
 * Data Transfer Object (DTO) para activar un producto.
 *
 * Contiene únicamente el identificador del producto
 * que será marcado como activo.
 */
export interface ActivateProductDTO {
    /**
     * Identificador único del producto a activar.
     */
    productId: string;
}
