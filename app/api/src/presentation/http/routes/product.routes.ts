import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

export function productRoutes(controller: ProductController) {
  const router = Router();

  router.post("/", controller.create.bind(controller));
  router.put("/:id", controller.update.bind(controller));
  router.patch("/:id/activate", controller.activate.bind(controller));
  router.patch("/:id/deactivate", controller.deactivate.bind(controller));
  router.get("/", controller.getAll.bind(controller));
  router.get("/:id", controller.getById.bind(controller));

  return router;
}
