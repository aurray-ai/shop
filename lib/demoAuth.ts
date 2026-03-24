export interface DemoStoredUser {
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface DemoSessionUser {
  name: string;
  email: string;
  loggedInAt: string;
}

const USERS_KEY = "aurray_shop_demo_users_v1";
const SESSION_KEY = "aurray_shop_demo_session_v1";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function normalizeEmail(value: string): string {
  return String(value || "").trim().toLowerCase();
}

function readUsers(): DemoStoredUser[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as DemoStoredUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: DemoStoredUser[]): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getDemoSessionUser(): DemoSessionUser | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    if (typeof parsed.email !== "string" || typeof parsed.name !== "string") return null;
    return parsed as DemoSessionUser;
  } catch {
    return null;
  }
}

export function isDemoAuthenticated(): boolean {
  return Boolean(getDemoSessionUser());
}

export function logoutDemoUser(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(SESSION_KEY);
}

export function registerDemoUser(input: {
  name: string;
  email: string;
  password: string;
}): { ok: boolean; error?: string } {
  const name = String(input.name || "").trim();
  const email = normalizeEmail(input.email);
  const password = String(input.password || "");

  if (!name) return { ok: false, error: "Full name is required." };
  if (!email || !email.includes("@")) return { ok: false, error: "A valid email is required." };
  if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };

  const users = readUsers();
  const exists = users.some((user) => normalizeEmail(user.email) === email);
  if (exists) return { ok: false, error: "An account with this email already exists." };

  users.push({
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  });
  writeUsers(users);
  return { ok: true };
}

export function loginDemoUser(input: {
  email: string;
  password: string;
}): { ok: boolean; error?: string } {
  const email = normalizeEmail(input.email);
  const password = String(input.password || "");
  const users = readUsers();
  const match = users.find((user) => normalizeEmail(user.email) === email && user.password === password);

  if (!match) {
    return { ok: false, error: "Invalid email or password." };
  }

  if (isBrowser()) {
    const session: DemoSessionUser = {
      name: match.name,
      email: match.email,
      loggedInAt: new Date().toISOString(),
    };
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  return { ok: true };
}

export function resolveDemoNextPath(nextValue: string | string[] | undefined, fallback = "/shop"): string {
  const raw = Array.isArray(nextValue) ? nextValue[0] : nextValue;
  if (!raw) return fallback;
  if (!raw.startsWith("/") || raw.startsWith("//")) return fallback;
  if (raw.startsWith("/auth/")) return fallback;
  return raw;
}
