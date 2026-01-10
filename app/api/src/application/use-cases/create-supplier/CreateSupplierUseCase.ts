import { randomUUID } from "crypto";
import { SupplierRepository } from "../../../domain/supplier/SupplierRepository";
import { Supplier } from "../../../domain/supplier/Supplier";
import { CreateSupplierDTO } from "./CreateSupplierDTO";

/**
 * Caso de uso: Crear proveedor.
 */
export class CreateSupplierUseCase {
  constructor(
    private supplierRepository: SupplierRepository
  ) {}

  async execute(dto: CreateSupplierDTO): Promise<void> {
    const supplier = Supplier.create({
      id: randomUUID(),
      name: dto.name,
      address: dto.address,
      contact: dto.contact
    });

    await this.supplierRepository.save(supplier);
  }
}
