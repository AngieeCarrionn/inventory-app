import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

export function productRoutes(controller: ProductController) {
    const router = Router();

    router.post("/", controller.create.bind(controller));
    router.get("/:id", controller.getById.bind(controller));

    return router;
}
