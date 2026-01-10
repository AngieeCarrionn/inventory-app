import { Router } from "express";
import { StocksController } from "../controllers/StockController";

export function stocksRoutes(controller: StocksController) {
  const router = Router();

  router.get("/", controller.getAll.bind(controller));
  router.get("/:productId", controller.getByProductId.bind(controller));

  return router;
}
