"use client";

import { useEffect, useState } from "react";
import { productService } from "@/services/productService";
import { Product } from "@/types/Product";
import { Button } from "@/components/Button";
import { Table } from "@/components/Table";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        productService.getAll().then(setProducts);
    }, []);

    return (
        <>
            <h1 className="text-xl mb-4">Products</h1>

            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>{p.price}</td>
                            <td>{p.isActive ? "Active" : "Inactive"}</td>
                            <td>
                                {p.isActive ? (
                                    <Button onClick={() => productService.deactivate(p.id)}>
                                        Deactivate
                                    </Button>
                                ) : (
                                    <Button onClick={() => productService.activate(p.id)}>
                                        Activate
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
