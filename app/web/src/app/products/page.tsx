"use client";

import { useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Table, Column } from "../../components/Table";

interface Product {
    id: string;
    name: string;
    price: number;
}

const columns: Column<Product>[] = [
    { header: "Nombre", accessor: "name" },
    { header: "Precio", accessor: "price" },
];

export default function ProductsPage() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const [products, setProducts] = useState<Product[]>([]);

    const saveProduct = () => {
        setProducts((prev) => [
            ...prev,
            { id: crypto.randomUUID(), name, price: Number(price) },
        ]);
    };

    return (
        <div className="flex flex-col gap-6">
            <h1>Productos</h1>

            <Input
                label="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <Input
                label="Precio"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <Button onClick={saveProduct}>Guardar</Button>

            <Table columns={columns} data={products} />
        </div>
    );
}
