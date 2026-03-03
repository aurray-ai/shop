import Head from "next/head";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { ArrowRightIcon, StarIcon } from "@heroicons/react/24/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import ShopChrome from "@/components/shop/ShopChrome";
import { addToCart, getCartCount, readCart } from "@/lib/shopCart";
import { shopProducts } from "@/lib/shopDemoData";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

export default function ShopProductListPage() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(getCartCount(readCart()));
  }, []);

  const topRatedProduct = useMemo(
    () =>
      [...shopProducts].sort((a, b) => {
        if (b.rating !== a.rating) return b.rating - a.rating;
        return b.reviews - a.reviews;
      })[0],
    []
  );

  const handleAddToCart = (slug: string, name: string) => {
    const nextLines = addToCart(slug, 1);
    setCartCount(getCartCount(nextLines));
    toast.success(`${name} added to cart`);
  };

  return (
    <>
      <Head>
        <title>Shop Products - Aurray</title>
      </Head>

      <ShopChrome
        cartCount={cartCount}
        title="Workspace gear that looks premium and works harder"
        subtitle="Browse curated products for ecommerce demos. Each page is crafted to look like a polished storefront while staying easy to test."
      >
        <section className="mb-6 grid gap-4 lg:grid-cols-3">
          <article className="relative overflow-hidden rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-100 p-6 lg:col-span-2">
            <p className="inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
              Spring Offer
            </p>
            <h2 className="mt-4 max-w-xl text-2xl font-semibold text-slate-900 sm:text-3xl">
              Save up to 30% on bestselling productivity essentials
            </h2>
            <p className="mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
              Explore audio, lighting, and ergonomic upgrades designed for high-performance teams.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/shop/cart"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                View cart
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <p className="inline-flex items-center rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-sm text-slate-600">
                Free shipping over {formatCurrency(120)}
              </p>
            </div>
          </article>

          {topRatedProduct && (
            <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Top Rated</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{topRatedProduct.name}</h3>
              <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                <StarIcon className="h-4 w-4 text-amber-400" />
                {topRatedProduct.rating.toFixed(1)} ({topRatedProduct.reviews} reviews)
              </div>
              <p className="mt-3 text-sm text-slate-600">{topRatedProduct.description}</p>
              <div
                className="mt-4 h-28 rounded-2xl"
                style={{
                  background: `linear-gradient(140deg, ${topRatedProduct.palette.from}, ${topRatedProduct.palette.via} 52%, ${topRatedProduct.palette.to})`,
                }}
              />
              <div className="mt-4 flex items-center justify-between">
                <p className="text-lg font-semibold text-slate-900">{formatCurrency(topRatedProduct.price)}</p>
                <Link
                  href={`/shop/product/${topRatedProduct.slug}`}
                  className="text-sm font-medium text-cyan-700 hover:text-cyan-900"
                >
                  View product
                </Link>
              </div>
            </article>
          )}
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Product List</h2>
            <p className="text-sm text-slate-500">{shopProducts.length} products</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {shopProducts.map((product) => (
              <article
                key={product.slug}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div
                  className="relative h-52 p-4"
                  style={{
                    background: `linear-gradient(145deg, ${product.palette.from}, ${product.palette.via} 48%, ${product.palette.to})`,
                  }}
                >
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute -right-7 top-4 h-24 w-24 rounded-full bg-white/35 blur-sm" />
                    <div className="absolute bottom-5 left-5 h-14 w-14 rounded-full bg-white/20" />
                  </div>
                  <div className="relative flex h-full items-end justify-between">
                    <p className="max-w-[78%] text-base font-semibold text-white drop-shadow">{product.name}</p>
                    {product.badge && (
                      <span className="rounded-full bg-white/85 px-2.5 py-1 text-xs font-semibold text-slate-700">
                        {product.badge}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{product.category}</p>
                  <p className="mt-2 text-sm text-slate-600">{product.description}</p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                    <StarIcon className="h-4 w-4 text-amber-400" />
                    {product.rating.toFixed(1)} ({product.reviews})
                  </div>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p className="text-xl font-semibold text-slate-900">{formatCurrency(product.price)}</p>
                      {product.oldPrice && (
                        <p className="text-sm text-slate-400 line-through">{formatCurrency(product.oldPrice)}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/shop/product/${product.slug}`}
                        className="rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                      >
                        Product Item
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product.slug, product.name)}
                        className="inline-flex items-center gap-1 rounded-full bg-cyan-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-cyan-700"
                      >
                        <ShoppingCartIcon className="h-4 w-4" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </ShopChrome>
    </>
  );
}
