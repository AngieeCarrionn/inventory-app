import express from "express";
import { registerRoutes } from "./presentation/http/routes";

// Controllers
import { ProductController } from "./presentation/http/controllers/ProductController";
import { InventoryController } from "./presentation/http/controllers/InventoryController";
import { StocksController } from "./presentation/http/controllers/StockController";
import { SuppliersController } from "./presentation/http/controllers/SuppliersController";

// Repositories (Mongo)
import { MongoProductRepository } from "./infrastructure/repositories/MongoProductRepository";
import { MongoStockRepository } from "./infrastructure/repositories/MongoStockRepository";
import { MongoInventoryMovementRepository } from "./infrastructure/repositories/MongoInventoryMovementRepository";
import { MongoSupplierRepository } from "./infrastructure/repositories/MongoSupplierRepository";

// Use cases - Products
import { CreateProductUseCase } from "./application/use-cases/create-product/CreateProductUseCase";
import { UpdateProductUseCase } from "./application/use-cases/update-product/UpdateProductUseCase";
import { ActivateProductUseCase } from "./application/use-cases/activate-product/ActivateProductUseCase";
import { DeactivateProductUseCase } from "./application/use-cases/deactivate-product/DeactivateProductUseCase";
import { GetProductByIdUseCase } from "./application/use-cases/get-product-by-id/GetProductByIdUseCase";
import { GetProductsUseCase } from "./application/use-cases/get-products/GetProductsUseCase";

// Use cases - Stock
import { GetStockUseCase } from "./application/use-cases/get-stock/GetStockUseCase";

// Use cases - Inventory
import { RegisterInventoryMovementUseCase } from "./application/use-cases/register-inventory-movement/RegisterInventoryMovementUseCase";
import { GetInventoryMovementsUseCase } from "./application/use-cases/get-inventory-movements/GetInventoryMovementsUseCase";

// Use cases - Suppliers
import { CreateSupplierUseCase } from "./application/use-cases/create-supplier/CreateSupplierUseCase";
import { GetSuppliersUseCase } from "./application/use-cases/get-suppliers/GetSuppliersUseCase";

export function buildApp() {
    const app = express();
    app.use(express.json());

    // =====================
    // Repositories
    // =====================
    const productRepo = new MongoProductRepository();
    const stockRepo = new MongoStockRepository();
    const movementRepo = new MongoInventoryMovementRepository();
    const supplierRepo = new MongoSupplierRepository();

    // =====================
    // Use cases
    // =====================
    // Products
    const createProductUC = new CreateProductUseCase(productRepo);
    const updateProductUC = new UpdateProductUseCase(productRepo);
    const activateProductUC = new ActivateProductUseCase(productRepo);
    const deactivateProductUC = new DeactivateProductUseCase(productRepo);
    const getProductByIdUC = new GetProductByIdUseCase(productRepo);
    const getProductsUC = new GetProductsUseCase(productRepo);

    // Stock
    const getStockUC = new GetStockUseCase(stockRepo);

    // Inventory movements
    const registerMovementUC = new RegisterInventoryMovementUseCase(
        stockRepo,
        movementRepo
    );
    const getMovementsUC = new GetInventoryMovementsUseCase(movementRepo);

    // Suppliers
    const createSupplierUC = new CreateSupplierUseCase(supplierRepo);
    const getSuppliersUC = new GetSuppliersUseCase(supplierRepo);

    // =====================
    // Controllers
    // =====================
    const productController = new ProductController(
        createProductUC,
        updateProductUC,
        activateProductUC,
        deactivateProductUC,
        getProductsUC,
        getProductByIdUC
    );

    const inventoryController = new InventoryController(
        registerMovementUC,
        getMovementsUC
    );

    const stocksController = new StocksController(getStockUC);
    const suppliersController = new SuppliersController(
        createSupplierUC,
        getSuppliersUC
    );

    // =====================
    // Routes
    // =====================
    app.use(
        "/api",
        registerRoutes(
            productController,
            inventoryController,
            stocksController,
            suppliersController
        )
    );

    // Healthcheck
    app.get("/health", (_, res) =>
        res.status(200).json({ status: "ok" })
    );

    return app;
}
