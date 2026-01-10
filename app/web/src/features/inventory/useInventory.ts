import { registerInventoryMovement } from "@/services/inventoryService";

export function useInventory() {
    return { registerInventoryMovement };
}
