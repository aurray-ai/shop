import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { isDemoAuthenticated, loginDemoUser, resolveDemoNextPath } from "@/lib/demoAuth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const nextPath = useMemo(() => resolveDemoNextPath(router.query.next), [router.query.next]);
  const registerHref = nextPath === "/shop" ? "/auth/register" : `/auth/register?next=${encodeURIComponent(nextPath)}`;

  useEffect(() => {
    if (!router.isReady) return;
    if (isDemoAuthenticated()) {
      router.replace(nextPath);
    }
  }, [nextPath, router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const result = loginDemoUser({ email, password });
    if (!result.ok) {
      setError(result.error || "Unable to sign in.");
      return;
    }

    toast.success("Signed in");
    router.push(nextPath);
  };

  return (
    <>
      <Head>
        <title>Login - Aurray Shop</title>
      </Head>
      <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,_#cffafe_0,_#f0fdfa_30%,_#ffffff_70%)] px-4 py-10 text-slate-900 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/60 bg-white/90 p-5 shadow-[0_24px_90px_-45px_rgba(8,47,73,0.5)] backdrop-blur sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr,1fr]">
            <section className="rounded-2xl bg-gradient-to-br from-cyan-600 via-teal-500 to-emerald-500 p-6 text-white sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-50">Aurray Store</p>
              <h1 className="mt-4 text-3xl font-semibold leading-tight">Sign in to continue your ecommerce demo</h1>
              <p className="mt-4 text-sm text-cyan-50/90">
                Demo authentication is fully local to this frontend. No backend account is created.
              </p>
              <div className="mt-6 rounded-xl bg-white/20 p-3 text-xs text-cyan-50">
                Use a registered demo account and continue to product list, cart, and checkout.
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">Login</h2>
              <p className="mt-1 text-sm text-slate-600">Access your local demo account.</p>
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <label className="block text-sm font-medium text-slate-700">
                  Email
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 focus:border-cyan-500 focus:ring-cyan-500"
                    placeholder="you@example.com"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Password
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 focus:border-cyan-500 focus:ring-cyan-500"
                    placeholder="••••••••"
                  />
                </label>

                {error ? <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p> : null}

                <button
                  type="submit"
                  className="w-full rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
                >
                  Login
                </button>
              </form>

              <p className="mt-4 text-sm text-slate-600">
                New demo user?{" "}
                <Link href={registerHref} className="font-medium text-cyan-700 hover:text-cyan-900">
                  Create account
                </Link>
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
