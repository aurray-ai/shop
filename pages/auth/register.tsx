import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  isDemoAuthenticated,
  loginDemoUser,
  registerDemoUser,
  resolveDemoNextPath,
} from "@/lib/demoAuth";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const nextPath = useMemo(() => resolveDemoNextPath(router.query.next), [router.query.next]);
  const loginHref = nextPath === "/shop" ? "/auth/login" : `/auth/login?next=${encodeURIComponent(nextPath)}`;

  useEffect(() => {
    if (!router.isReady) return;
    if (isDemoAuthenticated()) {
      router.replace(nextPath);
    }
  }, [nextPath, router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const created = registerDemoUser({ name, email, password });
    if (!created.ok) {
      setError(created.error || "Unable to create account.");
      return;
    }

    const loggedIn = loginDemoUser({ email, password });
    if (!loggedIn.ok) {
      setError("Account created but auto-login failed. Please sign in.");
      router.push(loginHref);
      return;
    }

    toast.success("Account created");
    router.push(nextPath);
  };

  return (
    <>
      <Head>
        <title>Register - Aurray Shop</title>
      </Head>
      <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#dbeafe_0,_#f0fdf4_35%,_#ffffff_72%)] px-4 py-10 text-slate-900 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/60 bg-white/90 p-5 shadow-[0_24px_90px_-45px_rgba(15,23,42,0.42)] backdrop-blur sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr,1fr]">
            <section className="rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-600 to-emerald-500 p-6 text-white sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-50">Aurray Store</p>
              <h1 className="mt-4 text-3xl font-semibold leading-tight">Create your local demo account</h1>
              <p className="mt-4 text-sm text-cyan-50/90">
                Registration is stored in browser local storage for UI demos only.
              </p>
              <div className="mt-6 rounded-xl bg-white/20 p-3 text-xs text-cyan-50">
                You can register multiple demo users and test login flows without backend integration.
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900">Register</h2>
              <p className="mt-1 text-sm text-slate-600">Create a local account to access the shop.</p>
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <label className="block text-sm font-medium text-slate-700">
                  Full name
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 focus:border-cyan-500 focus:ring-cyan-500"
                    placeholder="Aurray Demo User"
                  />
                </label>
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
                    placeholder="Minimum 6 characters"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Confirm password
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 focus:border-cyan-500 focus:ring-cyan-500"
                    placeholder="Repeat password"
                  />
                </label>

                {error ? <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p> : null}

                <button
                  type="submit"
                  className="w-full rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
                >
                  Create account
                </button>
              </form>

              <p className="mt-4 text-sm text-slate-600">
                Already registered?{" "}
                <Link href={loginHref} className="font-medium text-cyan-700 hover:text-cyan-900">
                  Login
                </Link>
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
