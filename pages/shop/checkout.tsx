import Head from "next/head";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import ShopChrome from "@/components/shop/ShopChrome";
import { CartLine, clearCart, getCartCount, getCartSubtotal, readCart, toDetailedLines } from "@/lib/shopCart";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

export default function CheckoutPage() {
  const [cartLines, setCartLines] = useState<CartLine[]>([]);
  const [isPlaced, setIsPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("United Kingdom");
  const [postalCode, setPostalCode] = useState("");

  useEffect(() => {
    setCartLines(readCart());
  }, []);

  const detailed = useMemo(() => toDetailedLines(cartLines), [cartLines]);
  const cartCount = getCartCount(cartLines);
  const subtotal = useMemo(() => getCartSubtotal(cartLines), [cartLines]);
  const shipping = subtotal > 120 || subtotal === 0 ? 0 : 9.99;
  const tax = subtotal * 0.2;
  const total = subtotal + shipping + tax;

  const submitOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!detailed.length) return;
    clearCart();
    setCartLines([]);
    setIsPlaced(true);
  };

  return (
    <>
      <Head>
        <title>Checkout - Aurray Shop</title>
      </Head>
      <ShopChrome
        cartCount={cartCount}
        title="Checkout"
        subtitle="Final step of the ecommerce flow with shipping details, payment, and order summary."
      >
        {isPlaced ? (
          <section className="mx-auto max-w-2xl rounded-3xl border border-emerald-200 bg-emerald-50/70 p-8 text-center shadow-sm">
            <p className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Order confirmed
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">Thanks for your purchase</h2>
            <p className="mt-3 text-sm text-slate-600">
              Your demo checkout was successful. A confirmation email would normally be sent to the customer.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex rounded-full bg-slate-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
            >
              Back to Product List
            </Link>
          </section>
        ) : !detailed.length ? (
          <section className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">No items for checkout</h2>
            <p className="mt-2 text-sm text-slate-600">Your cart is empty. Add some products first.</p>
            <Link
              href="/shop"
              className="mt-5 inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
            >
              Go to Product List
            </Link>
          </section>
        ) : (
          <section className="grid gap-5 lg:grid-cols-[1.35fr,1fr]">
            <form onSubmit={submitOrder} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-semibold text-slate-900">Shipping Details</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="text-sm font-medium text-slate-700 sm:col-span-2">
                  Full name
                  <input
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 focus:border-cyan-500 focus:ring-cyan-500"
                    placeholder="Aurray Demo User"
                  />
                </label>

                <label className="text-sm font-medium text-slate-700 sm:col-span-2">
                  Email
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 focus:border-cyan-500 focus:ring-cyan-500"
                    placeholder="demo@aurray.co.uk"
                  />
                </label>

                <label className="text-sm font-medium text-slate-700 sm:col-span-2">
                  Address
                  <input
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 focus:border-cyan-500 focus:ring-cyan-500"
                    placeholder="12 Commerce Street"
                  />
                </label>

                <label className="text-sm font-medium text-slate-700">
                  City
                  <input
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 focus:border-cyan-500 focus:ring-cyan-500"
                    placeholder="London"
                  />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  Country
                  <input
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 focus:border-cyan-500 focus:ring-cyan-500"
                  />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  Postal code
                  <input
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 focus:border-cyan-500 focus:ring-cyan-500"
                    placeholder="SW1A 1AA"
                  />
                </label>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Payment</h3>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 p-3 text-sm">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="h-4 w-4 text-cyan-600 focus:ring-cyan-500"
                    />
                    Credit / Debit Card
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 p-3 text-sm">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "paypal"}
                      onChange={() => setPaymentMethod("paypal")}
                      className="h-4 w-4 text-cyan-600 focus:ring-cyan-500"
                    />
                    PayPal
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="mt-7 w-full rounded-full bg-cyan-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-cyan-700"
              >
                Place Order
              </button>
            </form>

            <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-semibold text-slate-900">Order Summary</h2>
              <div className="mt-4 space-y-3">
                {detailed.map(({ product, quantity }) => (
                  <div key={product.slug} className="flex items-center justify-between gap-2 text-sm">
                    <div>
                      <p className="font-medium text-slate-800">{product.name}</p>
                      <p className="text-slate-500">Qty {quantity}</p>
                    </div>
                    <p className="font-medium text-slate-900">{formatCurrency(product.price * quantity)}</p>
                  </div>
                ))}
              </div>

              <dl className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-sm">
                <div className="flex justify-between text-slate-600">
                  <dt>Subtotal</dt>
                  <dd>{formatCurrency(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-slate-600">
                  <dt>Shipping</dt>
                  <dd>{shipping === 0 ? "Free" : formatCurrency(shipping)}</dd>
                </div>
                <div className="flex justify-between text-slate-600">
                  <dt>Tax</dt>
                  <dd>{formatCurrency(tax)}</dd>
                </div>
                <div className="flex justify-between text-base font-semibold text-slate-900">
                  <dt>Total</dt>
                  <dd>{formatCurrency(total)}</dd>
                </div>
              </dl>
            </aside>
          </section>
        )}
      </ShopChrome>
    </>
  );
}
