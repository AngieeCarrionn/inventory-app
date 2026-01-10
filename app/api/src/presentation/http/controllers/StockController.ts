import { Request, Response } from "express";
import { GetStockUseCase } from "../../../application/use-cases/get-stock/GetStockUseCase";

export class StocksController {
  constructor(
    private getStockUseCase: GetStockUseCase
  ) {}

  async getAll(req: Request, res: Response) {
    const stocks = await this.getStockUseCase.execute();
    return res.status(200).json(stocks);
  }

  async getByProductId(req: Request, res: Response) {
    const stock = await this.getStockUseCase.execute(req.params.productId);
    return res.status(200).json(stock);
  }
}
