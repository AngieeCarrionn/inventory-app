import { Request, Response } from "express";
import { CreateSupplierUseCase } from "../../../application/use-cases/create-supplier/CreateSupplierUseCase";
import { GetSuppliersUseCase } from "../../../application/use-cases/get-suppliers/GetSuppliersUseCase";

/**
 * Controlador HTTP para operaciones relacionadas con proveedores.
 *
 * Traduce errores de dominio a respuestas HTTP.
 */
export class SuppliersController {
    constructor(
        private createSupplierUseCase: CreateSupplierUseCase,
        private getSuppliersUseCase: GetSuppliersUseCase
    ) { }

    /**
     * Crea un nuevo proveedor.
     */
    async create(req: Request, res: Response) {
        try {
            await this.createSupplierUseCase.execute(req.body);

            return res.status(201).json({
                message: "Supplier created"
            });
        } catch (error: any) {
            return res.status(400).json({
                message: error.message
            });
        }
    }

    /**
     * Obtiene la lista de proveedores.
     */
    async getAll(req: Request, res: Response) {
        try {
            const suppliers = await this.getSuppliersUseCase.execute();

            return res.status(200).json(suppliers);
        } catch (error: any) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
}
