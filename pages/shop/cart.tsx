import Head from "next/head";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import ShopChrome from "@/components/shop/ShopChrome";
import {
  CartLine,
  getCartCount,
  getCartSubtotal,
  readCart,
  removeFromCart,
  toDetailedLines,
  updateCartQuantity,
} from "@/lib/shopCart";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

export default function CartPage() {
  const [cartLines, setCartLines] = useState<CartLine[]>([]);

  useEffect(() => {
    setCartLines(readCart());
  }, []);

  const detailed = useMemo(() => toDetailedLines(cartLines), [cartLines]);
  const subtotal = useMemo(() => getCartSubtotal(cartLines), [cartLines]);
  const shipping = subtotal > 120 || subtotal === 0 ? 0 : 9.99;
  const tax = subtotal * 0.2;
  const total = subtotal + shipping + tax;
  const cartCount = getCartCount(cartLines);

  const onQuantityChange = (slug: string, quantity: number) => {
    const next = updateCartQuantity(slug, quantity);
    setCartLines(next);
  };

  const onRemove = (slug: string) => {
    const next = removeFromCart(slug);
    setCartLines(next);
  };

  return (
    <>
      <Head>
        <title>Cart - Aurray Shop</title>
      </Head>
      <ShopChrome
        cartCount={cartCount}
        title="Cart"
        subtitle="Review selected products, tune quantities, and continue to checkout."
      >
        {detailed.length === 0 ? (
          <section className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Your cart is empty</h2>
            <p className="mt-2 text-sm text-slate-600">Add products from the list to continue your checkout flow demo.</p>
            <Link
              href="/shop"
              className="mt-5 inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
            >
              Go to Product List
            </Link>
          </section>
        ) : (
          <section className="grid gap-5 lg:grid-cols-[1.45fr,1fr]">
            <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-semibold text-slate-900">Items ({cartCount})</h2>
              <div className="mt-5 space-y-4">
                {detailed.map(({ product, quantity }) => (
                  <div
                    key={product.slug}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-100 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="h-16 w-16 rounded-xl"
                        style={{
                          background: `linear-gradient(145deg, ${product.palette.from}, ${product.palette.via}, ${product.palette.to})`,
                        }}
                      />
                      <div>
                        <p className="font-medium text-slate-900">{product.name}</p>
                        <p className="text-sm text-slate-500">{product.category}</p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">{formatCurrency(product.price)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="inline-flex items-center overflow-hidden rounded-full border border-slate-200">
                        <button
                          type="button"
                          onClick={() => onQuantityChange(product.slug, quantity - 1)}
                          className="px-3 py-1.5 text-slate-600 hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="min-w-[38px] px-2 py-1.5 text-center text-sm font-medium text-slate-900">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onQuantityChange(product.slug, quantity + 1)}
                          className="px-3 py-1.5 text-slate-600 hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemove(product.slug)}
                        className="rounded-full p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
                        aria-label={`Remove ${product.name}`}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-semibold text-slate-900">Order Summary</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between text-slate-600">
                  <dt>Subtotal</dt>
                  <dd>{formatCurrency(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-slate-600">
                  <dt>Shipping</dt>
                  <dd>{shipping === 0 ? "Free" : formatCurrency(shipping)}</dd>
                </div>
                <div className="flex justify-between text-slate-600">
                  <dt>Tax (20%)</dt>
                  <dd>{formatCurrency(tax)}</dd>
                </div>
                <div className="mt-4 border-t border-slate-100 pt-4 text-base font-semibold text-slate-900">
                  <div className="flex justify-between">
                    <dt>Total</dt>
                    <dd>{formatCurrency(total)}</dd>
                  </div>
                </div>
              </dl>

              <Link
                href="/shop/checkout"
                className="mt-6 block rounded-full bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white transition hover:bg-cyan-700"
              >
                Continue to Checkout
              </Link>
              <Link
                href="/shop"
                className="mt-3 block text-center text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Continue shopping
              </Link>
            </article>
          </section>
        )}
      </ShopChrome>
    </>
  );
}
