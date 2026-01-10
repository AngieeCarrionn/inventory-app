/**
 * DTO para crear un proveedor.
 */
export interface CreateSupplierDTO {
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
