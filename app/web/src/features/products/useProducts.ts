import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import { getProductById } from "@/services/productService";

export function useProduct(productId: string) {
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        getProductById(productId).then(setProduct);
    }, [productId]);

    return product;
}
