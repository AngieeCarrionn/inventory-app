import { Request, Response } from "express";
import { GetStockUseCase } from "../../../application/use-cases/get-stock/GetStockUseCase";

/**
 * Controlador HTTP para consultas de stock.
 *
 * Traduce errores de dominio a respuestas HTTP adecuadas.
 */
export class StocksController {
    constructor(
        private getStockUseCase: GetStockUseCase
    ) { }

    /**
     * Obtiene el stock de todos los productos.
     */
    async getAll(req: Request, res: Response) {
        try {
            const stocks = await this.getStockUseCase.execute();
            return res.status(200).json(stocks);
        } catch (error: any) {
            return res.status(500).json({
                message: error.message
            });
        }
    }

    /**
     * Obtiene el stock de un producto específico por su ID.
     */
    async getByProductId(req: Request, res: Response) {
        try {
            const stock = await this.getStockUseCase.execute(req.params.productId);
            return res.status(200).json(stock);
        } catch (error: any) {
            return res.status(404).json({
                message: error.message
            });
        }
    }
}
