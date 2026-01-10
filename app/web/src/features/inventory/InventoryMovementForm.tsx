"use client";

import { useState } from "react";
import { useInventory } from "./useInventory";

export function InventoryMovementForm() {
    const { registerInventoryMovement } = useInventory();
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState(1);

    const submit = async () => {
        await registerInventoryMovement({
            productId,
            quantity,
            movementType: "IN"
        });
    };

    return (
        <div className="p-8 space-y-2">
            <h2 className="text-xl font-bold">Register Inventory Movement</h2>

            <input
                className="border p-2"
                placeholder="Product ID"
                value={productId}
                onChange={e => setProductId(e.target.value)}
            />

            <input
                type="number"
                className="border p-2"
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
            />

            <button className="bg-black text-white px-4 py-2" onClick={submit}>
                Save
            </button>
        </div>
    );
}
