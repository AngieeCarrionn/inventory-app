import { InventoryController } from "./presentation/http/controllers/InventoryController";

// IMPLEMENTACIONES CONCRETAS
import { MongoStockRepository } from "./infrastructure/repositories/MongoStockRepository";
import { MongoInventoryMovementRepository } from "./infrastructure/repositories/MongoInventoryMovementRepository";

// CASO DE USO
import { RegisterInventoryMovementUseCase } from "./application/use-cases/register-inventory-movement/RegisterInventoryMovementUseCase";

const stockRepo = new MongoStockRepository();
const movementRepo = new MongoInventoryMovementRepository();

const registerMovementUseCase =
    new RegisterInventoryMovementUseCase(stockRepo, movementRepo);

export const inventoryController =
    new InventoryController(registerMovementUseCase);

