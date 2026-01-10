/**
 * Data Transfer Object (DTO) para la actualización de un producto.
 *
 * Este objeto representa los datos necesarios para actualizar un
 * producto existente en el sistema.
 */
export interface UpdateProductDTO {
    /**
     * Id del producto.
     * Ejemplo: "f6a1c2d4-..."
     */
    id: string;

    /**
     * Nombre del producto.
     * Ejemplo: "Cámara digital Sony"
     */
    name: string;

    /**
     * Descripción detallada del producto.
     * Puede incluir características, especificaciones o notas.
     */
    description: string;

    /**
     * Precio unitario del producto en la moneda utilizada por la aplicación.
     * Debe ser un número positivo.
     */
    price: number;

    /**
     * Identificador del proveedor asociado al producto.
     * Corresponde al ID de la entidad `Supplier`.
     */
    supplierId: string;
}
