import { Router } from "express";
import { InventoryController } from "../controllers/InventoryController";
import { inventoryRoutes } from "./inventory.routes";

export function registerRoutes(
    inventoryController: InventoryController
) {
    const router = Router();

    router.use("/inventory", inventoryRoutes(inventoryController));

    return router;
}
