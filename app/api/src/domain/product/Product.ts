/**
 * Representa un producto del catálogo/inventario.
 *
 * El producto es una entidad de dominio inmutable en cuanto a su `id`,
 * y ofrece métodos para actualizar sus datos y cambiar su estado (activo/inactivo).
 *
 * Propiedades:
 * - id: Identificador único del producto.
 * - name: Nombre del producto.
 * - description: Descripción del producto.
 * - price: Precio unitario (debe ser > 0).
 * - supplierId: Identificador del proveedor.
 * - active: Indica si el producto está activo.
 */
export class Product {
    private constructor(
        public readonly id: string,
        private name: string,
        private description: string,
        private price: number,
        private supplierId: string,
        private active: boolean
    ) { }

    /**
     * Factory para crear una nueva instancia de `Product`.
     *
     * Valida reglas de dominio mínimas (precio > 0) y fija `active` en true por defecto.
     *
     * @param data Objeto con los datos necesarios para crear el producto.
     * @returns Nueva instancia de `Product`.
     * @throws Error si `price` es menor o igual a 0.
     */
    static create(data: {
        id: string;
        name: string;
        description: string;
        price: number;
        supplierId: string;
    }): Product {
        if (data.price <= 0) {
            throw new Error("Price must be greater than zero");
        }

        return new Product(
            data.id,
            data.name,
            data.description,
            data.price,
            data.supplierId,
            true // activo por defecto
        );
    }

    // Getters
    /** Devuelve el nombre del producto. */
    getId(): string {
        return this.id;
    }
    /** Devuelve el nombre del producto. */
    getName(): string {
        return this.name;
    }

    /** Devuelve la descripción del producto. */
    getDescription(): string {
        return this.description;
    }

    /** Devuelve el precio unitario del producto. */
    getPrice(): number {
        return this.price;
    }

    /** Devuelve el id del proveedor asociado al producto. */
    getSupplierId(): string {
        return this.supplierId;
    }

    /** Indica si el producto está activo. */
    isActive(): boolean {
        return this.active;
    }

    // Comportamiento

    /**
     * Actualiza los detalles del producto.
     *
     * Aplica validaciones de dominio (precio > 0) y reemplaza los campos
     * mutables del producto.
     *
     * @param data Objeto con los nuevos valores de `name`, `description`, `price`, `supplierId`.
     * @throws Error si `price` es menor o igual a 0.
     */
    updateDetails(data: {
        name: string;
        description: string;
        price: number;
        supplierId: string;
    }): void {
        if (data.price <= 0) {
            throw new Error("Price must be greater than zero");
        }

        this.name = data.name;
        this.description = data.description;
        this.price = data.price;
        this.supplierId = data.supplierId;
    }

    /**
     * Activa el producto.
     *
     * @throws Error si el producto ya está activo.
     */
    activate(): void {
        if (this.active) {
            throw new Error("Product is already active");
        }
        this.active = true;
    }

    /**
     * Desactiva el producto (no lo elimina).
     *
     * Esto permite mantener el historial de inventario sin eliminar la entidad.
     *
     * @throws Error si el producto ya está inactivo.
     */
    deactivate(): void {
        if (!this.active) {
            throw new Error("Product is already inactive");
        }
        this.active = false;
    }
    static rehydrate(data: {
        id: string;
        name: string;
        description: string;
        price: number;
        supplierId: string;
        isActive: boolean;
    }): Product {
        return new Product(
            data.id,
            data.name,
            data.description,
            data.price,
            data.supplierId,
            data.isActive
        );
    }
}