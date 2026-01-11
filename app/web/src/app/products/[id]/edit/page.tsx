"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

import { productService } from "@/services/productService";
import { supplierService } from "@/services/supplierService";
import { Supplier } from "@/types/Supplier";
import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon";
import { Alert } from "@/components/Alert";
export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    if (!id) {
        return null;
    }
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        supplierId: "",
    });
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const loadData = async () => {
            const [product, suppliers] = await Promise.all([
                productService.getById(id),
                supplierService.getAll(),
            ]);

            setForm({
                name: product.name,
                description: product.description,
                price: product.price.toString(),
                supplierId: product.supplierId ?? "",
            });

            setSuppliers(suppliers);
            setLoading(false);
        };

        loadData();
    }, [id]);

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
        try {
            await productService.update(id, {
                name: form.name,
                description: form.description,
                price: Number(form.price),
                supplierId: form.supplierId,
            });

            router.push("/products");
        } catch (error: any) {
            setError(error.message);
        }
    };

    if (loading) {
        return (
            <p className="text-center text-[#F6F7E6]">
                Loading product...
            </p>
        );
    }

    return (
        <div className="max-w-xl mx-auto">

            <h1 className="text-2xl font-bold text-[#F6F7E6] mb-6">
                Edit product
            </h1>
            {error && (
                <Alert
                    message={error}
                    type="error"
                    onClose={() => setError(null)}
                />
            )}
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl shadow p-6 space-y-4"
            >

                {/* NAME */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Name
                    </label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-xl border"
                    />
                </div>

                {/* DESCRIPTION */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-xl border"
                    />
                </div>

                {/* PRICE */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-xl border"
                    />
                </div>

                {/* SUPPLIER */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Supplier
                    </label>

                    <select
                        name="supplierId"
                        value={form.supplierId}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-xl border bg-white"
                    >
                        <option value="">Select a supplier</option>

                        {suppliers.map(s => (
                            <option key={s.id} value={s.id}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center justify-between pt-4">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Back
                    </Link>

                    <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-[#74ADEB] text-white font-semibold hover:bg-[#74ADEB]/80 transition"
                    >
                        Save changes
                    </button>
                </div>
            </form>
        </div>
    );
}
