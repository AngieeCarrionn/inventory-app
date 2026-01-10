import Link from "next/link";

export default function HomePage() {
    return (
        <main className="p-8 space-y-4">
            <h1 className="text-2xl font-bold">Inventory App</h1>

            <nav className="space-x-4">
                <Link href="/products">Products</Link>
                <Link href="/inventory">Inventory</Link>
            </nav>
        </main>
    );
}
