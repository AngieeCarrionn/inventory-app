import { Router } from "express";
import { InventoryController } from "../controllers/InventoryController";

export function inventoryRoutes(controller: InventoryController) {
    const router = Router();

    // Registrar movimiento de inventario (IN | OUT | SALE)
    router.post(
        "/movements",
        controller.registerMovement.bind(controller)
    );

    // Obtener movimientos (opcionalmente filtrados por productId)
    router.get(
        "/movements",
        controller.getMovements.bind(controller)
    );

    return router;
}
