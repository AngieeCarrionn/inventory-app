import { SupplierRepository } from "../../../domain/supplier/SupplierRepository";
import { GetSuppliersResponseDTO } from "./GetSuppliersResponseDTO";

/**
 * Caso de uso: Obtener listado de proveedores.
 */
export class GetSuppliersUseCase {
    constructor(
        private supplierRepository: SupplierRepository
    ) { }

    async execute(): Promise<GetSuppliersResponseDTO[]> {
        const suppliers = await this.supplierRepository.findAll();

        return suppliers.map(supplier => ({
            id: supplier.getId(),
            name: supplier.getName(),
            address: supplier.getAddress(),
            contact: supplier.getContact()
        }));
    }
}
