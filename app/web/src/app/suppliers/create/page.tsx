"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { supplierService } from "@/services/supplierService";
import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon";
import { Alert } from "@/components/Alert";
export default function CreateSupplierPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        street: "",
        city: "",
        country: "",
        email: "",
        phone: "",
    });
    const [error, setError] = useState<string | null>(null);
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await supplierService.create({
                name: form.name,
                address: {
                    street: form.street,
                    city: form.city,
                    country: form.country,
                },
                contact: {
                    email: form.email,
                    phone: form.phone,
                },
            });

            router.push("/suppliers");
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className="max-w-xl mx-auto">

            <h1 className="text-2xl font-bold text-[#F6F7E6] mb-6">
                Create supplier
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
                        Supplier name
                    </label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-xl border"
                    />
                </div>

                {/* ADDRESS */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Street
                    </label>
                    <input
                        name="street"
                        value={form.street}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-xl border"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            City
                        </label>
                        <input
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-xl border"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Country
                        </label>
                        <input
                            name="country"
                            value={form.country}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-xl border"
                        />
                    </div>
                </div>

                {/* CONTACT */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-xl border"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Phone
                    </label>
                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-xl border"
                    />
                </div>

                {/* ACTIONS */}
                <div className="flex items-center justify-between pt-4">
                    <Link
                        href="/suppliers"
                        className="inline-flex items-center gap-2 text-sm text-gray-600"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Back
                    </Link>

                    <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-[#74ADEB] text-[#0D0D30] font-semibold hover:bg-[#74ADEB]/80 transition"
                    >
                        Create supplier
                    </button>
                </div>
            </form>
        </div>
    );
}
