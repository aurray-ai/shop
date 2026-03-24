import Head from "next/head";
import Image from "next/image";
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
  const shopBaseUrl = (process.env.NEXT_PUBLIC_SHOP_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
  const canonicalUrl = `${shopBaseUrl}/shop`;
  const listPreviewImage = `${shopBaseUrl}${shopProducts[0]?.image || "/images/Focus Headphones.jpg"}`;

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

  const productListStructuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Aurray Ecommerce Product List",
      itemListElement: shopProducts.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${shopBaseUrl}/shop/product/${product.slug}`,
        item: {
          "@type": "Product",
          name: product.name,
          sku: product.sku,
          category: product.category,
          image: [`${shopBaseUrl}${product.image}`],
          offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            price: product.price.toFixed(2),
            availability:
              product.availability === "in_stock"
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            url: `${shopBaseUrl}/shop/product/${product.slug}`,
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating.toFixed(1),
            reviewCount: product.reviews,
          },
        },
      })),
    }),
    [shopBaseUrl]
  );

  const handleAddToCart = (slug: string, name: string) => {
    const nextLines = addToCart(slug, 1);
    setCartCount(getCartCount(nextLines));
    toast.success(`${name} added to cart`);
  };

  return (
    <>
      <Head>
        <title>Aurray Shop | Ecommerce Product Catalog</title>
        <meta
          name="description"
          content="Browse Aurray ecommerce products with real images, pricing, ratings, and detailed product pages for reliable product data extraction."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Aurray Shop | Ecommerce Product Catalog" />
        <meta
          property="og:description"
          content="Explore Aurray workspace products with SEO-ready product detail pages and structured product metadata."
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={listPreviewImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aurray Shop | Ecommerce Product Catalog" />
        <meta
          name="twitter:description"
          content="Product catalog with real images, prices, and structured ecommerce metadata."
        />
        <meta name="twitter:image" content={listPreviewImage} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productListStructuredData) }}
        />
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
              <div className="relative mt-4 h-28 overflow-hidden rounded-2xl border border-slate-100">
                <Image
                  src={topRatedProduct.image}
                  alt={topRatedProduct.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
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
                data-product-slug={product.slug}
                data-product-sku={product.sku}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent p-4">
                    <div className="flex items-end justify-between">
                      <p className="max-w-[78%] text-base font-semibold text-white drop-shadow">{product.name}</p>
                      {product.badge && (
                        <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-700">
                          {product.badge}
                        </span>
                      )}
                    </div>
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
