/**
 * DTO de respuesta para proveedores.
 */
export interface GetSuppliersResponseDTO {
    id: string;
    name: string;
    address: {
        street: string;
        city: string;
        country: string;
    };
    contact: {
        email: string;
        phone: string;
    };
}
