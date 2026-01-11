import { useEffect, useState } from "react";
import { inventoryService } from "@/services/inventoryService";

export function useStock() {
    const [stock, setStock] = useState<any[]>([]);

    useEffect(() => {
        inventoryService.getStock().then(setStock);
    }, []);

    return { stock };
}