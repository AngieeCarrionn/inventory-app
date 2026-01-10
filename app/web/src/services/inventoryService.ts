import { InventoryMovement } from "@/types/InventoryMovement";
import { env } from "@/lib/env";

export async function registerInventoryMovement(
    movement: InventoryMovement
) {
    await fetch(`${env.API_URL}/inventory/movements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movement),
    });
}
