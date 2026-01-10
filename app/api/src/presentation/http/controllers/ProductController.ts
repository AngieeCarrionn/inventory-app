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
 * Traduce las peticiones HTTP (Express) a casos de uso y
 * transforma errores de dominio en respuestas HTTP.
 */
export class ProductController {
    constructor(
        private createProductUseCase: CreateProductUseCase,
        private updateProductUseCase: UpdateProductUseCase,
        private activateProductUseCase: ActivateProductUseCase,
        private deactivateProductUseCase: DeactivateProductUseCase,
        private getProductsUseCase: GetProductsUseCase,
        private getProductByIdUseCase: GetProductByIdUseCase
    ) { }

    /**
     * Crea un nuevo producto.
     */
    async create(req: Request, res: Response) {
        try {
            const result = await this.createProductUseCase.execute(req.body);

            return res.status(201).json(
                result ?? { message: "Product created" }
            );
        } catch (error: any) {
            return res.status(400).json({
                message: error.message
            });
        }
    }

    /**
     * Actualiza un producto existente.
     */
    async update(req: Request, res: Response) {
        try {
            await this.updateProductUseCase.execute({
                id: req.params.id,
                ...req.body
            });

            return res.status(200).json({
                message: "Product updated"
            });
        } catch (error: any) {
            return res.status(400).json({
                message: error.message
            });
        }
    }

    /**
     * Activa un producto por ID.
     */
    async activate(req: Request, res: Response) {
        try {
            await this.activateProductUseCase.execute({
                productId: req.params.id
            });

            return res.status(200).json({
                message: "Product activated"
            });
        } catch (error: any) {
            return res.status(400).json({
                message: error.message
            });
        }
    }

    /**
     * Desactiva un producto por ID.
     */
    async deactivate(req: Request, res: Response) {
        try {
            await this.deactivateProductUseCase.execute({
                productId: req.params.id
            });

            return res.status(200).json({
                message: "Product deactivated"
            });
        } catch (error: any) {
            return res.status(400).json({
                message: error.message
            });
        }
    }

    /**
     * Lista todos los productos.
     */
    async getAll(req: Request, res: Response) {
        try {
            const products = await this.getProductsUseCase.execute();
            return res.status(200).json(products);
        } catch (error: any) {
            return res.status(500).json({
                message: error.message
            });
        }
    }

    /**
     * Obtiene un producto por ID.
     */
    async getById(req: Request, res: Response) {
        try {
            const product = await this.getProductByIdUseCase.execute(req.params.id);
            return res.status(200).json(product);
        } catch (error: any) {
            return res.status(404).json({
                message: error.message
            });
        }
    }
}
