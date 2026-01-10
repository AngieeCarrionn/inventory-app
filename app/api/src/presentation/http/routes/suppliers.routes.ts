import { Router } from "express";
import { SuppliersController } from "../controllers/SuppliersController";

export function suppliersRoutes(controller: SuppliersController) {
  const router = Router();

  router.post("/", controller.create.bind(controller));
  router.get("/", controller.getAll.bind(controller));

  return router;
}
