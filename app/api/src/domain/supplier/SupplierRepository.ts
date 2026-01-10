import { Supplier } from "./Supplier";

/**
 * Repositorio para la persistencia y recuperación de proveedores (`Supplier`).
 *
 * Define las operaciones básicas necesarias para almacenar y consultar
 * proveedores. Las implementaciones concretas (adaptadores de base de datos,
 * mocks para pruebas, etc.) deben implementar esta interfaz.
 */
export interface SupplierRepository {
    /**
     * Persiste un proveedor en el almacenamiento.
     * @param supplier Instancia de `Supplier` a guardar.
     */
    save(supplier: Supplier): Promise<void>;

    /**
     * Recupera todos los proveedores registrados.
     * @returns `Promise<Supplier[]>` arreglo con las entidades `Supplier`.
     */
    findAll(): Promise<Supplier[]>;
    /**
     * Recupera un proveedor por su ID.
     * @returns `Promise<Supplier | null>` la entidad `Supplier` si existe, o `null` si no.
     */
    findById(id: string): Promise<Supplier | null>;
}
