"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { inventoryService } from "@/services/inventoryService";
import { InventoryMovement } from "@/types/InventoryMovement";
import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon";

export default function InventoryDetailsPage() {
    const [movements, setMovements] = useState<InventoryMovement[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const loadMovements = async () => {
            const data = await inventoryService.getMovements();
            setMovements(data);
        };

        loadMovements();
    }, []);

    const filteredMovements = useMemo(() => {
        const term = searchTerm.toLowerCase();

        return movements.filter(m =>
            m.productId.toLowerCase().includes(term) ||
            m.type.toLowerCase().includes(term)
        );
    }, [movements, searchTerm]);

    return (
        <div className="max-w-5xl mx-auto">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h1 className="text-2xl font-bold text-[#F6F7E6]">
                    Inventory movement details
                </h1>

                <input
                    type="text"
                    placeholder="Search by product or type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="
            px-4 py-2 rounded-xl
            bg-transparent
            border border-[#F6F7E6]/40
            text-[#F6F7E6]
            placeholder-[#F6F7E6]/70
            focus:outline-none
            focus:ring-2 focus:ring-[#74ADEB]
            text-sm
          "
                />
            </div>

            {/* TABLE */}
            <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="p-3 text-left">Product ID</th>
                        <th className="p-3 text-center">Type</th>
                        <th className="p-3 text-center">Quantity</th>
                        <th className="p-3 text-center">Note</th>
                        <th className="p-3 text-center">Date</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredMovements.length === 0 && (
                        <tr>
                            <td colSpan={4} className="p-6 text-center text-gray-500">
                                No movements found
                            </td>
                        </tr>
                    )}

                    {filteredMovements.map(m => (
                        <tr
                            key={m.id}
                            className="border-t hover:bg-gray-50 transition"
                        >
                            <td className="p-3 font-mono text-sm">
                                {m.productId}
                            </td>

                            <td className="p-3 text-center">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${m.type === "IN"
                                        ? "bg-green-100 text-green-700"
                                        : m.type === "SALE"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {m.type}
                                </span>
                            </td>

                            <td className="p-3 text-center">
                                {m.quantity}
                            </td>
                            <td className="p-3 text-center">
                                {m.note}
                            </td>
                            <td className="p-3 text-center text-gray-600">
                                {new Date(m.date).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* FOOTER */}
            <div className="mt-6">
                <Link
                    href="/inventory"
                    className="inline-flex items-center gap-2 text-sm text-[#F6F7E6]"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Back to stock
                </Link>
            </div>
        </div>
    );
}
