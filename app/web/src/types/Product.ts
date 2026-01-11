export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    supplierId?: string | null;
    isActive: boolean;
}
