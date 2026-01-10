import { Product } from "./Product";

/**
 * Repositorio para la persistencia y recuperación de entidades `Product`.
 *
 * Implementaciones concretas (p. ej. adaptadores de base de datos) deben
 * respetar esta interfaz para permitir la desacoplación entre la lógica de
 * negocio y la capa de infraestructura.
 */
export interface ProductRepository {
    /**
     * Busca un producto por su identificador.
     * @param id Identificador del producto.
     * @returns `Promise<Product | null>` con la entidad encontrada o `null` si no existe.
     */
    findById(id: string): Promise<Product | null>;

    /**
     * Recupera todos los productos disponibles.
     * @returns `Promise<Product[]>` arreglo con las entidades `Product`.
     */
    findAll(): Promise<Product[]>;

    /**
     * Persiste un nuevo producto en el almacenamiento.
     * @param product Entidad `Product` a guardar.
     */
    save(product: Product): Promise<void>;

    /**
     * Actualiza un producto existente en el almacenamiento.
     * @param product Entidad `Product` con los cambios a aplicar.
     */
    update(product: Product): Promise<void>;
}
