import { Request, Response } from "express";
import { CreateSupplierUseCase } from "../../../application/use-cases/create-supplier/CreateSupplierUseCase";
import { GetSuppliersUseCase } from "../../../application/use-cases/get-suppliers/GetSuppliersUseCase";

export class SuppliersController {
  constructor(
    private createSupplierUseCase: CreateSupplierUseCase,
    private getSuppliersUseCase: GetSuppliersUseCase
  ) {}

  async create(req: Request, res: Response) {
    await this.createSupplierUseCase.execute(req.body);
    return res.status(201).json({ message: "Supplier created" });
  }

  async getAll(req: Request, res: Response) {
    const suppliers = await this.getSuppliersUseCase.execute();
    return res.status(200).json(suppliers);
  }
}
