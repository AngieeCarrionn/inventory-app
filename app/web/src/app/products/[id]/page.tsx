import { ProductDetail } from "@/features/products/ProductDetail";

export default function ProductDetailPage({
  params
}: {
  params: { id: string };
}) {
  return <ProductDetail productId={params.id} />;
}
