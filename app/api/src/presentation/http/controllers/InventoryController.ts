import { Request, Response } from "express";
import { RegisterInventoryMovementUseCase } from "../../../application/use-cases/register-inventory-movement/RegisterInventoryMovementUseCase";
import { GetInventoryMovementsUseCase } from "../../../application/use-cases/get-inventory-movements/GetInventoryMovementsUseCase";

export class InventoryController {
    constructor(
        private registerInventoryMovementUseCase: RegisterInventoryMovementUseCase,
        private getInventoryMovementsUseCase: GetInventoryMovementsUseCase
    ) { }

    async registerMovement(req: Request, res: Response) {
        await this.registerInventoryMovementUseCase.execute(req.body);
        return res.status(201).json({ message: "Inventory movement registered" });
    }

    async getMovements(req: Request, res: Response) {
        const productId = req.query.productId as string | undefined;

        const movements =
            await this.getInventoryMovementsUseCase.execute(productId);

        return res.status(200).json(movements);
    }
}
