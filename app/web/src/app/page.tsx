import Link from "next/link";

export default function HomePage() {
    return (
        <div className="flex items-center justify-center w-full">
            <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md border border-[#0D0D30]/10">

                <h1 className="text-3xl font-extrabold text-[#0D0D30] mb-4 text-center">
                    Inventory App
                </h1>

                <p className="text-[#0D0D30]/70 text-center mb-8">
                    Register inbound and outbound movements, sales, and manage your inventory stock.
                </p>

                <div className="space-y-4">
                    <Link
                        href="/products"
                        className="block w-full text-center py-3 rounded-xl 
                       bg-[#74ADEB] text-[#0D0D30] font-semibold
                       hover:bg-[#74ADEB]/80 transition"
                    >
                        Products
                    </Link>

                    <Link
                        href="/inventory"
                        className="block w-full text-center py-3 rounded-xl
                       bg-[#54E89A] text-[#0D0D30] font-semibold
                       hover:bg-[#54E89A]/80 transition"
                    >
                        Inventory
                    </Link>

                    <Link
                        href="/suppliers"
                        className="block w-full text-center py-3 rounded-xl
                       bg-[#F5C462] text-[#0D0D30] font-semibold
                       hover:bg-[#F5C462]/80 transition"
                    >
                        Suppliers
                    </Link>
                </div>
            </div>
        </div>
    );
}
