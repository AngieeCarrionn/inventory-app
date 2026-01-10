import { Request, Response } from "express";
import { RegisterInventoryMovementUseCase } from "../../../application/use-cases/register-inventory-movement/RegisterInventoryMovementUseCase";

export class InventoryController {
    constructor(
        private registerInventoryMovementUseCase: RegisterInventoryMovementUseCase
    ) { }

    async registerMovement(req: Request, res: Response) {
        await this.registerInventoryMovementUseCase.execute({
            productId: req.body.productId,
            quantity: req.body.quantity,
            movementType: req.body.movementType,
            note: req.body.note
        });

        res.status(201).send();
    }
}
