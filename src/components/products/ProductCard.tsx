import Image from "next/image";
import Link from "next/link";
import type { Product } from "../../types/product";

interface ProductCardProps {
    product: Product;
}

export default function ProductCart({ product }: ProductCardProps) {
    const { id, title, price, category, image, rating } = product;

    return (
                <Link
                    href={`/products/${id}`}
                    className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-emerald-950/10 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                >
                    <div className="relative aspect-square w-full overflow-hidden bg-[#edf5f0] p-8">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-contain p-8 transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
                        <span className="w-fit max-w-full truncate rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold uppercase text-emerald-800">
                            {category}
                        </span>
                        <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-gray-900">
                            {title}
                        </h3>
                        <div className="mt-auto flex items-end justify-between gap-2 border-t border-gray-100 pt-3">
                            <span className="text-lg font-bold text-emerald-900">${price.toFixed(2)}</span>
                            <span className="shrink-0 text-sm font-medium text-amber-600">
                                ★ {rating.rate}{" "}
                                <span className="font-normal text-gray-400">({rating.count})</span>
                            </span>
                        </div>
                    </div>
        </Link>
    );
}

