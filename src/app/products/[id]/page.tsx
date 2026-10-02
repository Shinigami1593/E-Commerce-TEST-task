import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProductActions from "@/components/products/ProductActions";
import { getProductById } from "@/lib/api/products";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  return {
    title: `${product.title} | Everyday Store`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/products"
        className="text-sm font-medium text-emerald-800 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-950"
      >
        Back to products
      </Link>
      <article className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="relative aspect-square overflow-hidden rounded-xl border border-emerald-950/10 bg-white p-8 shadow-sm">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain p-8"
            priority
          />
        </div>
        <div className="flex flex-col items-start gap-5">
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-800">
              {product.category}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              {product.title}
            </h1>
          </div>
          <p className="text-2xl font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <span className="text-amber-600">★ {product.rating.rate}</span>
            <span>({product.rating.count} reviews)</span>
          </div>
          <p className="leading-7 text-gray-700">{product.description}</p>
          <ProductActions product={product} />
        </div>
      </article>
    </main>
  );
}