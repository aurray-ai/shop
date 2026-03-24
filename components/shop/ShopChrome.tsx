import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowRightOnRectangleIcon, ShoppingBagIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { DemoSessionUser, getDemoSessionUser, logoutDemoUser } from "@/lib/demoAuth";

interface ShopChromeProps {
  title: string;
  subtitle: string;
  cartCount?: number;
  children: ReactNode;
}

export default function ShopChrome({ title, subtitle, cartCount = 0, children }: ShopChromeProps) {
  const router = useRouter();
  const [sessionUser, setSessionUser] = useState<DemoSessionUser | null>(null);
  const nextPath = router.asPath && router.asPath.startsWith("/") ? router.asPath : "/shop";
  const loginHref = `/auth/login?next=${encodeURIComponent(nextPath)}`;
  const registerHref = `/auth/register?next=${encodeURIComponent(nextPath)}`;

  useEffect(() => {
    setSessionUser(getDemoSessionUser());
  }, []);

  const handleLogout = () => {
    logoutDemoUser();
    router.push("/auth/login");
  };

  return (
    <div className="public-theme min-h-screen bg-[radial-gradient(circle_at_top_left,_#f0fdfa_0,_#fefce8_35%,_#fff_70%)] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 shadow-[0_12px_50px_-25px_rgba(15,23,42,0.45)] backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-7">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-700 hover:text-slate-900"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                A
              </span>
              Aurray Store
            </Link>
            <nav className="flex items-center gap-2">
              <Link
                href="/shop"
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                Products
              </Link>
              <Link
                href="/shop/cart"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                <ShoppingBagIcon className="h-4 w-4" />
                Cart
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">{cartCount}</span>
              </Link>
              {sessionUser ? (
                <>
                  <span className="hidden items-center gap-1 rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 sm:inline-flex">
                    <UserCircleIcon className="h-4 w-4" />
                    {sessionUser.email}
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href={loginHref}
                    className="rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
                  >
                    Login
                  </Link>
                  <Link
                    href={registerHref}
                    className="rounded-full bg-cyan-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-cyan-700"
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
          <div className="px-5 py-6 sm:px-7">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">{subtitle}</p>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
