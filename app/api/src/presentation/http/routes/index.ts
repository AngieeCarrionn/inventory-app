import { Router } from "express";
import { productRoutes } from "./product.routes";
import { inventoryRoutes } from "./inventory.routes";
import { stocksRoutes } from "./stocks.routes";
import { suppliersRoutes } from "./suppliers.routes";

import { ProductController } from "../controllers/ProductController";
import { InventoryController } from "../controllers/InventoryController";
import { StocksController } from "../controllers/StockController";
import { SuppliersController } from "../controllers/SuppliersController";

export function registerRoutes(
  productController: ProductController,
  inventoryController: InventoryController,
  stocksController: StocksController,
  suppliersController: SuppliersController
) {
  const router = Router();

  router.use("/products", productRoutes(productController));
  router.use("/inventory", inventoryRoutes(inventoryController));
  router.use("/stocks", stocksRoutes(stocksController));
  router.use("/suppliers", suppliersRoutes(suppliersController));

  return router;
}
