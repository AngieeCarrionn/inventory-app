import { useEffect, useState } from "react";
import { productService } from "@/services/productService";
import { Product } from "@/types/Product";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        productService.getAll().then(setProducts);
    }, []);

    return { products };
}