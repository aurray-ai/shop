export interface ShopProduct {
  slug: string;
  sku: string;
  brand: string;
  name: string;
  category: string;
  image: string;
  imageAlt: string;
  availability: "in_stock" | "out_of_stock";
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
  seoDescription: string;
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
    sku: "AUR-FH-001",
    brand: "Aurray",
    name: "Focus Headphones",
    category: "Audio",
    image: "/images/Focus Headphones.jpg",
    imageAlt: "Aurray Focus Headphones in matte black finish",
    availability: "in_stock",
    price: 189,
    oldPrice: 229,
    rating: 4.8,
    reviews: 372,
    badge: "Best Seller",
    description:
      "Noise-canceling headphones tuned for deep work sessions and crystal call quality.",
    seoDescription:
      "Shop Focus Headphones with hybrid noise cancellation, 40-hour battery life, and clear call audio for focused work.",
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
    sku: "AUR-SM-002",
    brand: "Aurray",
    name: "Smart Mug",
    category: "Workspace",
    image: "/images/Smart Mug.webp",
    imageAlt: "Aurray Smart Mug with charging coaster on a desk",
    availability: "in_stock",
    price: 59.99,
    oldPrice: 79,
    rating: 4.6,
    reviews: 194,
    badge: "Flash Sale",
    description:
      "Temperature-controlled mug that keeps your coffee at the perfect sip for hours.",
    seoDescription:
      "Buy Smart Mug to keep drinks at your preferred temperature with long battery life and a one-tap heat preset.",
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
    sku: "AUR-EC-003",
    brand: "Aurray",
    name: "Ergonomic Chair",
    category: "Furniture",
    image: "/images/Ergonomic Chair.jpg",
    imageAlt: "Aurray Ergonomic Chair with breathable mesh back support",
    availability: "in_stock",
    price: 349,
    rating: 4.9,
    reviews: 128,
    badge: "New",
    description:
      "All-day comfort chair with dynamic lumbar support and breathable mesh back.",
    seoDescription:
      "Discover Ergonomic Chair featuring adaptive lumbar support, 4D armrests, and comfort for long work sessions.",
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
    sku: "AUR-DL-004",
    brand: "Aurray",
    name: "Desk Lamp Pro",
    category: "Lighting",
    image: "/images/Desk Lamp Pro.jpg",
    imageAlt: "Aurray Desk Lamp Pro casting warm desk lighting",
    availability: "in_stock",
    price: 99.5,
    rating: 4.7,
    reviews: 221,
    description:
      "Eye-comfort lighting with warm-to-cool temperature presets and gesture controls.",
    seoDescription:
      "Get Desk Lamp Pro with high CRI lighting, auto-brightness, and gesture controls for eye-comfort work setups.",
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
    sku: "AUR-WC-005",
    brand: "Aurray",
    name: "Webcam 4K",
    category: "Video",
    image: "/images/Webcam 4K.webp",
    imageAlt: "Aurray Webcam 4K mounted on a monitor",
    availability: "in_stock",
    price: 139,
    oldPrice: 169,
    rating: 4.5,
    reviews: 91,
    description:
      "Ultra-sharp webcam with auto-framing, low-light boost, and dual noise-reduction mics.",
    seoDescription:
      "Purchase Webcam 4K with auto-framing, low-light optimization, and dual mics for high-quality meetings and streaming.",
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
    sku: "AUR-SD-006",
    brand: "Aurray",
    name: "Standing Desk Lite",
    category: "Furniture",
    image: "/images/Standing Desk Lite.jpg",
    imageAlt: "Aurray Standing Desk Lite in height-adjusted position",
    availability: "in_stock",
    price: 399.99,
    rating: 4.7,
    reviews: 207,
    description:
      "Quiet dual-motor desk with programmable heights and anti-collision safety.",
    seoDescription:
      "Order Standing Desk Lite with dual motors, programmable height presets, and anti-collision safety for modern workspaces.",
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
