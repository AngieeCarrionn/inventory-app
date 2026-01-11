"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

import { stockService } from "@/services/stockService";
import { Stock } from "@/types/Stock";
import { PlusIcon } from "@/components/icons/PlusIcon";
import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon";

export default function StockPage() {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const loadStock = async () => {
        const data = await stockService.getAll();
        setStocks(data);
    };

    useEffect(() => {
        loadStock();
    }, []);

    // Filtrado en memoria (nombre del producto)
    const filteredStock = useMemo(() => {
        const term = searchTerm.toLowerCase();

        return stocks.filter(s =>
            s.productName.toLowerCase().includes(term)
        );
    }, [stocks, searchTerm]);

    return (
        <div className="max-w-5xl mx-auto">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-[#F6F7E6]">
                        Stock
                    </h1>
                </div>

                <div className="flex items-center gap-3">

                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search products..."
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

                    {/* Add movement */}
                    <Link
                        href="/inventory/create"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl
              bg-[#74ADEB] text-[#0D0D30] font-semibold
              hover:bg-[#74ADEB]/80 transition"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Add movement
                    </Link>
                </div>
            </div>

            {/* TABLE */}
            <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="p-3 text-left">Product</th>
                        <th className="p-3 text-center">Quantity</th>
                        <th className="p-3 text-center">Location</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredStock.length === 0 && (
                        <tr>
                            <td colSpan={3} className="p-6 text-center text-gray-500">
                                No stock found
                            </td>
                        </tr>
                    )}

                    {filteredStock.map(s => (
                        <tr
                            key={s.productId}
                            className="border-t hover:bg-gray-50 transition"
                        >
                            <td className="p-3 font-medium">
                                {s.productName}
                            </td>

                            <td className="p-3 text-center">
                                {s.quantity}
                            </td>

                            <td className="p-3 text-center text-gray-600">
                                {s.location}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* FOOTER */}
            <div className="mt-6 flex items-center justify-between">

                {/* Back (left) */}
                <Link
                    href="/"
                    className="
    inline-flex items-center gap-2
    px-4 py-2
    rounded-full
    bg-white
    border border-[#0D0D30]/20
    text-[#0D0D30]
    text-sm font-medium
    hover:bg-[#F6F7E6]
    transition
    shadow-sm
  "
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Back
                </Link>

                {/* View movements (right) */}
                <Link
                    href="/inventory/details"
                    className="
    px-4 py-2 rounded-xl
    bg-[#74ADEB]/80
    border border-[#74ADEB]/40
    text-[#0D0D30]
    text-sm font-medium
    hover:bg-[#74ADEB]/80
    transition
  "
                >
                    View movement details
                </Link>

            </div>


        </div>
    );
}
