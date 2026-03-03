import { ShopProduct, shopProductMap } from "@/lib/shopDemoData";

export interface CartLine {
  slug: string;
  quantity: number;
}

const CART_STORAGE_KEY = "aurray_demo_cart_v1";

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function sanitize(lines: CartLine[]): CartLine[] {
  const merged = new Map<string, number>();
  lines.forEach((line) => {
    const slug = String(line.slug || "").trim();
    if (!slug || !shopProductMap[slug]) return;
    const qty = Number(line.quantity || 0);
    if (qty <= 0) return;
    merged.set(slug, (merged.get(slug) || 0) + Math.floor(qty));
  });
  return Array.from(merged.entries()).map(([slug, quantity]) => ({ slug, quantity }));
}

export function readCart(): CartLine[] {
  if (!canUseStorage()) return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return sanitize(parsed as CartLine[]);
  } catch {
    return [];
  }
}

export function writeCart(lines: CartLine[]): CartLine[] {
  const clean = sanitize(lines);
  if (canUseStorage()) {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(clean));
  }
  return clean;
}

export function addToCart(slug: string, quantity = 1): CartLine[] {
  const current = readCart();
  const existing = current.find((line) => line.slug === slug);
  if (existing) {
    existing.quantity += Math.max(1, Math.floor(quantity));
    return writeCart(current);
  }
  return writeCart([...current, { slug, quantity: Math.max(1, Math.floor(quantity)) }]);
}

export function updateCartQuantity(slug: string, quantity: number): CartLine[] {
  const current = readCart();
  const next = current.map((line) =>
    line.slug === slug ? { ...line, quantity: Math.floor(quantity) } : line
  );
  return writeCart(next);
}

export function removeFromCart(slug: string): CartLine[] {
  const current = readCart();
  return writeCart(current.filter((line) => line.slug !== slug));
}

export function clearCart(): void {
  if (canUseStorage()) {
    window.localStorage.removeItem(CART_STORAGE_KEY);
  }
}

export function getCartCount(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

export function toDetailedLines(lines: CartLine[]): Array<{ product: ShopProduct; quantity: number }> {
  return lines
    .map((line) => ({
      product: shopProductMap[line.slug],
      quantity: line.quantity,
    }))
    .filter((line) => Boolean(line.product));
}

export function getCartSubtotal(lines: CartLine[]): number {
  return toDetailedLines(lines).reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0
  );
}
