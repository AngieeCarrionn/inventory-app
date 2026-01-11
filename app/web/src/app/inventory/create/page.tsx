"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { inventoryService } from "@/services/inventoryService";
import { productService } from "@/services/productService";
import { Product } from "@/types/Product";
import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon";

export default function CreateInventoryMovementPage() {
    const router = useRouter();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        productId: "",
        quantity: "",
        movementType: "SELL",
        note: "",
    });

    useEffect(() => {
        const loadProducts = async () => {
            const data = await productService.getAll();
            setProducts(data);
            setLoading(false);
        };

        loadProducts();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await inventoryService.registerMovement({
            productId: form.productId,
            quantity: Number(form.quantity),
            movementType: form.movementType as any,
            note: form.note,
        });

        router.push("/inventory");
    };

    if (loading) {
        return <p className="text-center text-[#F6F7E6]">Loading...</p>;
    }

    return (
        <div className="max-w-xl mx-auto">

            <h1 className="text-2xl font-bold text-[#F6F7E6] mb-6">
                Create inventory movement
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl shadow p-6 space-y-4"
            >

                {/* PRODUCT */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Product
                    </label>
                    <select
                        name="productId"
                        value={form.productId}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-xl border bg-white"
                    >
                        <option value="">Select a product</option>
                        {products.map(p => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* QUANTITY */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Quantity
                    </label>
                    <input
                        type="number"
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        required
                        min={1}
                        className="w-full px-4 py-2 rounded-xl border"
                    />
                </div>

                {/* MOVEMENT TYPE */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Movement type
                    </label>
                    <select
                        name="movementType"
                        value={form.movementType}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl border bg-white"
                    >
                        <option value="IN">IN</option>
                        <option value="OUT">OUT</option>
                        <option value="SELL">SELL</option>
                        <option value="ADJUST">ADJUST</option>
                    </select>
                </div>

                {/* NOTE */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Note
                    </label>
                    <textarea
                        name="note"
                        value={form.note}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-xl border"
                    />
                </div>

                {/* ACTIONS */}
                <div className="flex items-center justify-between pt-4">
                    <Link
                        href="/stock"
                        className="inline-flex items-center gap-2 text-sm text-gray-600"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Back
                    </Link>

                    <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-[#74ADEB] text-[#0D0D30] font-semibold hover:bg-[#74ADEB]/80 transition"
                    >
                        Create movement
                    </button>
                </div>
            </form>
        </div>
    );
}
