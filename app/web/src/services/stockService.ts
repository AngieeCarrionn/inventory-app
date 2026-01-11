import { apiClient } from "@/lib/apiClient";
import { Stock } from "@/types/Stock";

export const stockService = {
    getAll: (): Promise<Stock[]> =>
        apiClient<Stock[]>("/stocks"),
};
