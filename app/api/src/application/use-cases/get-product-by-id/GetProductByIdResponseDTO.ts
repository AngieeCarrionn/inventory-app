/**
 * DTO de respuesta para obtener un producto por su identificador.
 *
 * Representa los datos que se devuelven al cliente cuando se solicita
 * la información de un producto existente.
 */
export interface GetProductByIdResponseDTO {
    /**
     * Identificador único del producto.
     * Ejemplo: "f6a1c2d4-..."
     */
    id: string;

    /**
     * Nombre comercial del producto.
     */
    name: string;

    /**
     * Descripción detallada del producto.
     */
    description: string;

    /**
     * Precio unitario del producto en la moneda utilizada por la aplicación.
     */
    price: number;

    /**
     * Identificador del proveedor asociado al producto.
     */
    supplierId: string;

    /**
     * Indica si el producto está activo y disponible.
     * `true` = activo, `false` = deshabilitado.
     */
    isActive: boolean;
}
