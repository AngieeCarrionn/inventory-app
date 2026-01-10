import { Request, Response } from "express";
import { CreateProductUseCase } from "../../../application/use-cases/create-product/CreateProductUseCase";
import { GetProductByIdUseCase } from "../../../application/use-cases/get-product-by-id/GetProductByIdUseCase";

export class ProductController {
    constructor(
        private createProductUseCase: CreateProductUseCase,
        private getProductByIdUseCase: GetProductByIdUseCase
    ) { }

    async create(req: Request, res: Response) {
        const { name, description, price, supplierId } = req.body;

        await this.createProductUseCase.execute({
            name,
            description,
            price,
            supplierId
        });

        res.status(201).send();
    }

    async getById(req: Request, res: Response) {
        const productId = req.params.id;

        const product = await this.getProductByIdUseCase.execute(productId);

        res.status(200).json(product);
    }
}
