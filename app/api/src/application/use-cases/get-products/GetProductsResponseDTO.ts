/**
 * DTO de respuesta para listar productos.
 */
export interface GetProductsResponseDTO {
    id: string;
    name: string;
    description: string;
    price: number;
    supplierId: string;
    isActive: boolean;
}
