export interface ShopProduct {
  slug: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
  highlights: string[];
  palette: {
    from: string;
    via: string;
    to: string;
    accent: string;
  };
}

export const shopProducts: ShopProduct[] = [
  {
    slug: "aurray-focus-headphones",
    name: "Aurray Focus Headphones",
    category: "Audio",
    price: 189,
    oldPrice: 229,
    rating: 4.8,
    reviews: 372,
    badge: "Best Seller",
    description:
      "Noise-canceling headphones tuned for deep work sessions and crystal call quality.",
    highlights: [
      "40-hour battery life",
      "Hybrid ANC with voice isolation",
      "Low-latency mode for meetings",
    ],
    palette: {
      from: "#0f172a",
      via: "#1e293b",
      to: "#334155",
      accent: "#22d3ee",
    },
  },
  {
    slug: "aurray-smart-mug",
    name: "Aurray Smart Mug",
    category: "Workspace",
    price: 59.99,
    oldPrice: 79,
    rating: 4.6,
    reviews: 194,
    badge: "Flash Sale",
    description:
      "Temperature-controlled mug that keeps your coffee at the perfect sip for hours.",
    highlights: [
      "Up to 3h battery or all-day on coaster",
      "One-tap preset temperature",
      "Dishwasher-safe lid",
    ],
    palette: {
      from: "#164e63",
      via: "#0e7490",
      to: "#06b6d4",
      accent: "#ecfeff",
    },
  },
  {
    slug: "aurray-ergonomic-chair",
    name: "Aurray Ergonomic Chair",
    category: "Furniture",
    price: 349,
    rating: 4.9,
    reviews: 128,
    badge: "New",
    description:
      "All-day comfort chair with dynamic lumbar support and breathable mesh back.",
    highlights: [
      "4D armrests and seat depth adjustment",
      "Adaptive lumbar tension",
      "Silent caster wheels",
    ],
    palette: {
      from: "#1f2937",
      via: "#374151",
      to: "#4b5563",
      accent: "#a5b4fc",
    },
  },
  {
    slug: "aurray-desk-lamp-pro",
    name: "Aurray Desk Lamp Pro",
    category: "Lighting",
    price: 99.5,
    rating: 4.7,
    reviews: 221,
    description:
      "Eye-comfort lighting with warm-to-cool temperature presets and gesture controls.",
    highlights: [
      "CRI 95 true color rendering",
      "Auto-brightness with ambient sensor",
      "USB-C charging port",
    ],
    palette: {
      from: "#312e81",
      via: "#4f46e5",
      to: "#6366f1",
      accent: "#e0e7ff",
    },
  },
  {
    slug: "aurray-webcam-4k",
    name: "Aurray Webcam 4K",
    category: "Video",
    price: 139,
    oldPrice: 169,
    rating: 4.5,
    reviews: 91,
    description:
      "Ultra-sharp webcam with auto-framing, low-light boost, and dual noise-reduction mics.",
    highlights: [
      "4K @ 30fps, 1080p @ 60fps",
      "Auto-focus with face tracking",
      "Magnetic privacy cap included",
    ],
    palette: {
      from: "#3f1d2e",
      via: "#7e22ce",
      to: "#a855f7",
      accent: "#f5d0fe",
    },
  },
  {
    slug: "aurray-standing-desk-lite",
    name: "Aurray Standing Desk Lite",
    category: "Furniture",
    price: 399.99,
    rating: 4.7,
    reviews: 207,
    description:
      "Quiet dual-motor desk with programmable heights and anti-collision safety.",
    highlights: [
      "3 memory presets",
      "Fast, low-noise lift system",
      "Cable tray and hook included",
    ],
    palette: {
      from: "#3f3f46",
      via: "#52525b",
      to: "#71717a",
      accent: "#f4f4f5",
    },
  },
];

export const shopProductMap: Record<string, ShopProduct> = shopProducts.reduce(
  (acc, product) => {
    acc[product.slug] = product;
    return acc;
  },
  {} as Record<string, ShopProduct>
);
