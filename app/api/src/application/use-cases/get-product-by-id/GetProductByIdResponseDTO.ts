export interface GetProductByIdResponseDTO {
    id: string;
    name: string;
    description: string;
    price: number;
    supplierId: string;
    isActive: boolean;
}
