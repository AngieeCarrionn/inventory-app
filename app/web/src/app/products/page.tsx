"use client";

import { useEffect, useState } from "react";
import { productService } from "@/services/productService";
import { Product } from "@/types/Product";
import { Button } from "@/components/Button";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);

    const loadProducts = async () => {
        const data = await productService.getAll();
        setProducts(data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const toggleProduct = async (product: Product) => {
        if (product.isActive) {
            await productService.deactivate(product.id);
        } else {
            await productService.activate(product.id);
        }

        // 🔁 refrescar estado
        await loadProducts();
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-[#0D0D30]">
                Products
            </h1>

            <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="p-3 text-left">Product</th>
                        <th className="p-3 text-center">Price</th>
                        <th className="p-3 text-center">Status</th>
                        <th className="p-3 text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map(p => (
                        <tr key={p.id} className="border-t">
                            <td className="p-3">{p.name}</td>
                            <td className="p-3 text-center">${p.price}</td>
                            <td className="p-3 text-center">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${p.isActive
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {p.isActive ? "Active" : "Inactive"}
                                </span>
                            </td>
                            <td className="p-3 text-center">
                                <Button onClick={() => toggleProduct(p)}>
                                    {p.isActive ? "Deactivate" : "Activate"}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
