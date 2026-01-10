import { Request, Response, NextFunction } from "express";

export function validateInventoryMovement(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { productId, quantity, movementType } = req.body;

    if (!productId || !quantity || !movementType) {
        return res.status(400).json({
            message: "Invalid request body"
        });
    }

    next();
}
