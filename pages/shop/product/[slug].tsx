import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeftIcon, StarIcon } from "@heroicons/react/24/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import ShopChrome from "@/components/shop/ShopChrome";
import { addToCart, getCartCount, readCart } from "@/lib/shopCart";
import { shopProductMap } from "@/lib/shopDemoData";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

export default function ProductItemPage() {
  const router = useRouter();
  const slug = Array.isArray(router.query.slug) ? router.query.slug[0] : router.query.slug;
  const product = useMemo(() => (slug ? shopProductMap[String(slug)] : undefined), [slug]);

  const [cartCount, setCartCount] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setCartCount(getCartCount(readCart()));
  }, []);

  const addCurrentProduct = () => {
    if (!product) return;
    const lines = addToCart(product.slug, quantity);
    setCartCount(getCartCount(lines));
    toast.success(`${product.name} added to cart`);
  };

  if (!product) {
    return (
      <>
        <Head>
          <title>Product Not Found - Aurray</title>
        </Head>
        <ShopChrome
          cartCount={cartCount}
          title="Product Item"
          subtitle="The requested product could not be found."
        >
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-sm text-slate-500">We couldn&apos;t find that product.</p>
            <Link
              href="/shop"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Product List
            </Link>
          </div>
        </ShopChrome>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} - Aurray Shop</title>
      </Head>
      <ShopChrome
        cartCount={cartCount}
        title="Product Item"
        subtitle="Detailed product view designed for ecommerce demos and tracking walkthroughs."
      >
        <Link
          href="/shop"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Product List
        </Link>

        <section className="grid gap-5 lg:grid-cols-2">
          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div
              className="relative h-[390px] overflow-hidden rounded-2xl"
              style={{
                background: `linear-gradient(145deg, ${product.palette.from}, ${product.palette.via} 52%, ${product.palette.to})`,
              }}
            >
              <div className="absolute inset-0">
                <div className="absolute -top-10 right-8 h-36 w-36 rounded-full bg-white/30 blur-sm" />
                <div className="absolute bottom-10 left-10 h-24 w-24 rounded-full bg-white/20" />
                <div className="absolute bottom-8 right-16 h-16 w-16 rounded-xl border border-white/25" />
              </div>
              <div className="relative flex h-full items-end p-6">
                <div>
                  <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                    {product.category}
                  </span>
                  <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{product.name}</h2>
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{product.category}</p>
              {product.badge && (
                <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-semibold text-cyan-700">
                  {product.badge}
                </span>
              )}
            </div>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
              <StarIcon className="h-4 w-4 text-amber-400" />
              {product.rating.toFixed(1)} ({product.reviews} reviews)
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">{product.description}</p>

            <div className="mt-5 flex items-baseline gap-3">
              <p className="text-3xl font-semibold text-slate-900">{formatCurrency(product.price)}</p>
              {product.oldPrice && (
                <p className="text-base text-slate-400 line-through">{formatCurrency(product.oldPrice)}</p>
              )}
            </div>

            <ul className="mt-6 space-y-2">
              {product.highlights.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-500" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center overflow-hidden rounded-full border border-slate-200">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  -
                </button>
                <span className="min-w-[44px] px-3 py-2 text-center text-sm font-medium text-slate-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.min(10, prev + 1))}
                  className="px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={addCurrentProduct}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-cyan-700"
              >
                <ShoppingCartIcon className="h-4 w-4" />
                Add to Cart
              </button>

              <button
                type="button"
                onClick={() => router.push("/shop/checkout")}
                className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Buy Now
              </button>
            </div>
          </article>
        </section>
      </ShopChrome>
    </>
  );
}
