import { productService } from "@/services/productService";

export async function toggleProductStatus(productId: string, isActive: boolean) {
    if (isActive) {
        await productService.deactivate(productId);
    } else {
        await productService.activate(productId);
    }
}