"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

import { productService } from "@/services/productService";
import { Product } from "@/types/Product";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { EditIcon } from "@/components/icons/EditIcon";
import { PlusIcon } from "@/components/icons/PlusIcon";
import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

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

        await loadProducts();
    };

    // Filtrado en memoria (nombre + descripción)
    const filteredProducts = useMemo(() => {
        const term = searchTerm.toLowerCase();

        return products.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term)
        );
    }, [products, searchTerm]);

    return (
        <div className="max-w-5xl mx-auto">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h1 className="text-2xl font-bold text-[#F6F7E6]">
                    Products
                </h1>

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

                    {/* Add product */}
                    <Link
                        href="/products/create"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl
              bg-[#74ADEB] text-[#F6F7E6] font-semibold
              hover:bg-[#74ADEB]/80 transition"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Add product
                    </Link>
                </div>
            </div>

            {/* TABLE */}
            <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="p-3 text-left">Product</th>
                        <th className="p-3 text-left">Description</th>
                        <th className="p-3 text-center">Price</th>
                        <th className="p-3 text-center">Status</th>
                        <th className="p-3 text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredProducts.length === 0 && (
                        <tr>
                            <td
                                colSpan={5}
                                className="p-6 text-center text-gray-500"
                            >
                                No products found
                            </td>
                        </tr>
                    )}

                    {filteredProducts.map(p => (
                        <tr
                            key={p.id}
                            className="border-t hover:bg-gray-50 transition"
                        >
                            <td className="p-3 font-medium">
                                {p.name}
                            </td>

                            <td
                                className="p-3 text-gray-600 max-w-xs truncate"
                                title={p.description}
                            >
                                {p.description}
                            </td>

                            <td className="p-3 text-center">
                                ${p.price}
                            </td>

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

                            {/* ACTIONS */}
                            <td className="p-3 text-center">
                                <div className="flex items-center justify-center gap-4">

                                    {/* Edit */}
                                    <Link
                                        href={`/products/${p.id}/edit`}
                                        title="Edit product"
                                        aria-label="Edit product"
                                        className="text-gray-500 hover:text-blue-600 transition"
                                    >
                                        <EditIcon className="w-5 h-5" />
                                    </Link>

                                    {/* Toggle */}
                                    <ToggleSwitch
                                        checked={p.isActive}
                                        onChange={() => toggleProduct(p)}
                                    />
                                </div>
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
            </div>
        </div>
    );
}
