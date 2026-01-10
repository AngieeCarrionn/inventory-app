import { Request, Response } from "express";
import { RegisterInventoryMovementUseCase } from "../../../application/use-cases/register-inventory-movement/RegisterInventoryMovementUseCase";
import { GetInventoryMovementsUseCase } from "../../../application/use-cases/get-inventory-movements/GetInventoryMovementsUseCase";

export class InventoryController {
    constructor(
        private registerInventoryMovementUseCase: RegisterInventoryMovementUseCase,
        private getInventoryMovementsUseCase: GetInventoryMovementsUseCase
    ) { }

    async registerMovement(req: Request, res: Response) {
        try {
            await this.registerInventoryMovementUseCase.execute(req.body);

            return res.status(201).json({
                message: "Inventory movement registered"
            });
        } catch (error: any) {
            return res.status(400).json({
                message: error.message
            });
        }
    }

    async getMovements(req: Request, res: Response) {
        try {
            const productId = req.query.productId as string | undefined;

            const movements =
                await this.getInventoryMovementsUseCase.execute(productId);

            return res.status(200).json(movements);
        } catch (error: any) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
}
