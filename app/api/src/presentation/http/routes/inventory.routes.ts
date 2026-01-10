import { Router } from "express";
import { InventoryController } from "../controllers/InventoryController";

export function inventoryRoutes(controller: InventoryController) {
    const router = Router();

    router.post(
        "/movements",
        controller.registerMovement.bind(controller)
    );

    return router;
}
