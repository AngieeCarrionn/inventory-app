/**
 * Entidad `Supplier` que representa a un proveedor del sistema.
 *
 * Utiliza un constructor privado y fábricas (`create` y `rehydrate`) para
 * controlar la creación y la reconstrucción desde la persistencia.
 */
export class Supplier {
    private constructor(
        private readonly id: string,
        private name: string,
        private address: {
            street: string;
            city: string;
            country: string;
        },
        private contact: {
            email: string;
            phone: string;
        }
    ) { }

    /**
     * Crea una nueva instancia de `Supplier` aplicando las reglas de negocio
     * necesarias al momento de la creación.
     *
     * @param data Datos necesarios para crear el proveedor.
     */
    static create(data: {
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
    }): Supplier {
        return new Supplier(
            data.id,
            data.name,
            data.address,
            data.contact
        );
    }

    /**
     * Reconstruye una entidad `Supplier` a partir de datos provenientes de
     * la capa de persistencia (rehidratación).
     */
    static rehydrate(data: {
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
    }): Supplier {
        return new Supplier(
            data.id,
            data.name,
            data.address,
            data.contact
        );
    }

    /**
     * @returns Identificador único del proveedor.
     */
    getId(): string {
        return this.id;
    }

    /**
     * @returns Nombre del proveedor.
     */
    getName(): string {
        return this.name;
    }

    /**
     * @returns Objeto con la dirección del proveedor (`street`, `city`, `country`).
     */
    getAddress() {
        return this.address;
    }

    /**
     * @returns Objeto con los datos de contacto (`email`, `phone`).
     */
    getContact() {
        return this.contact;
    }
}
