"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { productService } from "@/services/productService";
import { supplierService } from "@/services/supplierService";
import { Supplier } from "@/types/Supplier";
import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon";

export default function CreateProductPage() {
  const router = useRouter();

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loadingSuppliers, setLoadingSuppliers] = useState(true);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    supplierId: "",
  });

  useEffect(() => {
    const loadSuppliers = async () => {
      const data = await supplierService.getAll();
      setSuppliers(data);
      setLoadingSuppliers(false);
    };

    loadSuppliers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await productService.create({
      name: form.name,
      description: form.description,
      price: Number(form.price),
      supplierId: form.supplierId,
    });

    router.push("/products");
  };

  return (
    <div className="max-w-xl mx-auto">

      <h1 className="text-2xl font-bold text-[#F6F7E6] mb-6">
        Create product
      </h1>

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
            disabled={loadingSuppliers}
            className="w-full px-4 py-2 rounded-xl border bg-white"
          >
            <option value="">
              {loadingSuppliers
                ? "Loading suppliers..."
                : "Select a supplier"}
            </option>

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
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
