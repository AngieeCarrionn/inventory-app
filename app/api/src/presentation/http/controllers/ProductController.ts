import { Request, Response } from "express";
import { CreateProductUseCase } from "../../../application/use-cases/create-product/CreateProductUseCase";
import { UpdateProductUseCase } from "../../../application/use-cases/update-product/UpdateProductUseCase";
import { ActivateProductUseCase } from "../../../application/use-cases/activate-product/ActivateProductUseCase";
import { DeactivateProductUseCase } from "../../../application/use-cases/deactivate-product/DeactivateProductUseCase";
import { GetProductsUseCase } from "../../../application/use-cases/get-products/GetProductsUseCase";
import { GetProductByIdUseCase } from "../../../application/use-cases/get-product-by-id/GetProductByIdUseCase";

/**
 * Controlador HTTP para operaciones relacionadas con productos.
 *
 * Recibe las peticiones de la capa de presentación (Express) y delega en los
 * casos de uso correspondientes para aplicar la lógica de negocio.
 */
export class ProductController {
    /**
     * @param createProductUseCase Caso de uso para crear productos.
     * @param updateProductUseCase Caso de uso para actualizar productos.
     * @param activateProductUseCase Caso de uso para activar un producto.
     * @param deactivateProductUseCase Caso de uso para desactivar un producto.
     * @param getProductsUseCase Caso de uso para listar productos.
     * @param getProductByIdUseCase Caso de uso para obtener producto por ID.
     */
    constructor(
        private createProductUseCase: CreateProductUseCase,
        private updateProductUseCase: UpdateProductUseCase,
        private activateProductUseCase: ActivateProductUseCase,
        private deactivateProductUseCase: DeactivateProductUseCase,
        private getProductsUseCase: GetProductsUseCase,
        private getProductByIdUseCase: GetProductByIdUseCase
    ) { }

    /**
     * Crea un nuevo producto utilizando los datos en `req.body`.
     * Responde con `201 Created` y un mensaje de confirmación.
     */
    async create(req: Request, res: Response) {
        await this.createProductUseCase.execute(req.body);
        return res.status(201).json({ message: "Product created" });
    }

    /**
     * Actualiza un producto existente. Espera `id` en `req.params` y el resto
     * de campos en `req.body`.
     * Responde con `200 OK` y un mensaje de confirmación.
     */
    async update(req: Request, res: Response) {
        await this.updateProductUseCase.execute({
            id: req.params.id,
            ...req.body
        });
        return res.status(200).json({ message: "Product updated" });
    }

    /**
     * Activa un producto por su `id` (en `req.params`). Devuelve `200 OK`.
     */
    async activate(req: Request, res: Response) {
        await this.activateProductUseCase.execute({
            productId: req.params.id
        });
        return res.status(200).json({ message: "Product activated" });
    }

    /**
     * Desactiva un producto por su `id` (en `req.params`). Devuelve `200 OK`.
     */
    async deactivate(req: Request, res: Response) {
        await this.deactivateProductUseCase.execute({ productId: req.params.id });
        return res.status(200).json({ message: "Product deactivated" });
    }

    /**
     * Lista productos. Permite filtrar por estado `active` pasando `?active=true|false`.
     * Devuelve `200 OK` con el arreglo de productos.
     */
    async getAll(req: Request, res: Response) {
        const active =
            req.query.active !== undefined
                ? req.query.active === "true"
                : undefined;

        const products = await this.getProductsUseCase.execute(active);
        return res.status(200).json(products);
    }

    /**
     * Obtiene un producto por su identificador (`req.params.id`). Devuelve `200 OK`.
     */
    async getById(req: Request, res: Response) {
        const product = await this.getProductByIdUseCase.execute(req.params.id);
        return res.status(200).json(product);
    }
}
