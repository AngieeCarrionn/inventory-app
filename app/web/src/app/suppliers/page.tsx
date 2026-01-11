"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

import { supplierService } from "@/services/supplierService";
import { Supplier } from "@/types/Supplier";
import { PlusIcon } from "@/components/icons/PlusIcon";
import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon";

export default function SuppliersPage() {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const loadSuppliers = async () => {
        const data = await supplierService.getAll();
        setSuppliers(data);
    };

    useEffect(() => {
        loadSuppliers();
    }, []);

    // Filtrado en memoria (nombre + contacto)
    const filteredSuppliers = useMemo(() => {
        const term = searchTerm.toLowerCase();

        return suppliers.filter(s =>
            s.name.toLowerCase().includes(term) ||
            s.contact.email.toLowerCase().includes(term)
        );
    }, [suppliers, searchTerm]);

    return (
        <div className="max-w-5xl mx-auto">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h1 className="text-2xl font-bold text-[#F6F7E6]">
                    Suppliers
                </h1>

                <div className="flex items-center gap-3">

                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search supplier..."
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

                    {/* Add supplier */}
                    <Link
                        href="/suppliers/create"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl
              bg-[#74ADEB] text-[#0D0D30] font-semibold
              hover:bg-[#74ADEB]/80 transition"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Add supplier
                    </Link>
                </div>
            </div>

            {/* TABLE */}
            <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Address</th>
                        <th className="p-3 text-left">Contact</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredSuppliers.length === 0 && (
                        <tr>
                            <td colSpan={3} className="p-6 text-center text-gray-500">
                                No suppliers found
                            </td>
                        </tr>
                    )}

                    {filteredSuppliers.map(s => (
                        <tr
                            key={s.id}
                            className="border-t hover:bg-gray-50 transition"
                        >
                            <td className="p-3 font-medium">
                                {s.name}
                            </td>

                            <td className="p-3 text-gray-600">
                                {s.address.street}, {s.address.city}, {s.address.country}
                            </td>

                            <td className="p-3 text-gray-600">
                                <div>{s.contact.email}</div>
                                <div className="text-sm text-gray-500">{s.contact.phone}</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* FOOTER */}
            <div className="mt-6 flex items-center justify-between">
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
            </div>

        </div>
    );
}
