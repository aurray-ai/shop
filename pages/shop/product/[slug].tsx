import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { StarIcon } from "@heroicons/react/24/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import ShopChrome from "@/components/shop/ShopChrome";
import { addToCart, getCartCount, readCart } from "@/lib/shopCart";
import { ShopProduct, shopProductMap, shopProducts } from "@/lib/shopDemoData";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

interface ProductItemPageProps {
  product: ShopProduct;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: shopProducts.map((product) => ({
    params: { slug: product.slug },
  })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<ProductItemPageProps> = async (context) => {
  const slug = context.params?.slug;
  const parsedSlug = Array.isArray(slug) ? slug[0] : slug;
  const product = parsedSlug ? shopProductMap[parsedSlug] : undefined;

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default function ProductItemPage({ product }: ProductItemPageProps) {
  const shopBaseUrl = (process.env.NEXT_PUBLIC_SHOP_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
  const canonicalUrl = `${shopBaseUrl}/shop/product/${product.slug}`;
  const productImageUrl = `${shopBaseUrl}${product.image}`;

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

  const productStructuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.seoDescription,
      sku: product.sku,
      category: product.category,
      image: [productImageUrl],
      brand: {
        "@type": "Brand",
        name: product.brand,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating.toFixed(1),
        reviewCount: product.reviews,
      },
      offers: {
        "@type": "Offer",
        url: canonicalUrl,
        priceCurrency: "GBP",
        price: product.price.toFixed(2),
        availability:
          product.availability === "in_stock"
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        itemCondition: "https://schema.org/NewCondition",
      },
    }),
    [canonicalUrl, product, productImageUrl]
  );

  return (
    <>
      <Head>
        <title>{`${product.name} | Aurray Shop`}</title>
        <meta name="description" content={product.seoDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={`${product.name} | Aurray Shop`} />
        <meta property="og:description" content={product.seoDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={productImageUrl} />
        <meta property="product:price:currency" content="GBP" />
        <meta property="product:price:amount" content={product.price.toFixed(2)} />
        <meta
          property="product:availability"
          content={product.availability === "in_stock" ? "in stock" : "out of stock"}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} | Aurray Shop`} />
        <meta name="twitter:description" content={product.seoDescription} />
        <meta name="twitter:image" content={productImageUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData) }}
        />
      </Head>
      <ShopChrome
        cartCount={cartCount}
        title="Product Item"
        subtitle="Detailed product view designed for ecommerce demos and tracking walkthroughs."
      >
        <Link href="/shop" className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900">
          Back to Product List
        </Link>

        <section className="grid gap-5 lg:grid-cols-2">
          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="relative h-[390px] overflow-hidden rounded-2xl border border-slate-100">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 via-slate-900/35 to-transparent p-6">
                <div>
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                    {product.category}
                  </span>
                  <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{product.name}</h2>
                </div>
              </div>
            </div>
          </article>

          <article
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            data-product-slug={product.slug}
            data-product-sku={product.sku}
            data-product-price-gbp={product.price}
            data-product-availability={product.availability}
          >
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
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
              <p>SKU: {product.sku}</p>
              <p>Brand: {product.brand}</p>
              <p>Availability: {product.availability === "in_stock" ? "In stock" : "Out of stock"}</p>
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

              <Link
                href="/shop/checkout"
                className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Buy Now
              </Link>
            </div>
          </article>
        </section>
      </ShopChrome>
    </>
  );
}
