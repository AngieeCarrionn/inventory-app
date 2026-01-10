import { useProduct } from "./useProducts";

export function ProductDetail({ productId }: { productId: string }) {
    const product = useProduct(productId);

    if (!product) return <p>Loading...</p>;

    return (
        <div className="p-8">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="font-semibold">${product.price}</p>
        </div>
    );
}
