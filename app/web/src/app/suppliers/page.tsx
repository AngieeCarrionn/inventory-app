"use client";

import { useEffect, useState } from "react";
import { supplierService } from "@/services/supplierService";
import { Supplier } from "@/types/Supplier";
import { Table } from "@/components/Table";

export default function SuppliersPage() {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);

    useEffect(() => {
        supplierService.getAll().then(setSuppliers);
    }, []);

    return (
        <>
            <h1 className="text-xl mb-4">Suppliers</h1>

            <Table>
                <thead>
                    <tr>
                        <th className="p-2 text-left">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map(supplier => (
                        <tr key={supplier.id} className="border-t">
                            <td className="p-2">{supplier.name}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
