import { Supplier } from "./Supplier";

export interface SupplierRepository {
    save(supplier: Supplier): Promise<void>;
    findById(id: string): Promise<Supplier | null>;
}
