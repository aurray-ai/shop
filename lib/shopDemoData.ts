export interface ShopProductSpec {
  label: string;
  value: string;
}

export interface ShopProductReview {
  author: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  datePublished: string;
}

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
  longDescription: string[];
  specs: ShopProductSpec[];
  customerReviews: ShopProductReview[];
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
    longDescription: [
      "Focus Headphones are built for people who spend long stretches switching between solo work, calls, and music. The acoustic tuning leans clean and balanced, with enough low-end for modern playlists while keeping speech and meeting audio easy to follow.",
      "The ear cushions use slow-rebound memory foam and a medium clamp force, so the headset feels secure without creating pressure hot spots during a full day at the desk. Hybrid active noise cancellation pulls down HVAC hum, keyboard chatter, and commuting noise without making voices sound overly processed.",
      "For ecommerce enrichment and comparison shopping, this model is positioned as a premium productivity headphone rather than a bass-heavy lifestyle headset. Buyers usually compare it on battery life, microphone clarity, comfort over long sessions, and how quickly it switches between laptop and phone.",
    ],
    specs: [
      { label: "Driver size", value: "40 mm dynamic drivers" },
      { label: "Battery life", value: "Up to 40 hours with ANC on" },
      { label: "Charging", value: "USB-C fast charge, 10 min for 6 hours" },
      { label: "Wireless", value: "Bluetooth 5.3 with dual-device pairing" },
      { label: "Microphones", value: "4-mic beamforming array with ENC" },
      { label: "Weight", value: "268 g" },
      { label: "Included in box", value: "Case, USB-C cable, 3.5 mm audio cable" },
    ],
    customerReviews: [
      {
        author: "Daniel R.",
        location: "London, UK",
        rating: 5,
        title: "The first headset I can wear through an entire workday",
        body:
          "I bought these mainly for client calls and they have been excellent. The ANC removes office rumble without making me feel boxed in, and teammates said my voice sounded noticeably cleaner than on my old Sony pair.",
        datePublished: "2026-01-18",
      },
      {
        author: "Priya M.",
        location: "Manchester, UK",
        rating: 5,
        title: "Battery life is genuinely as advertised",
        body:
          "I charge them roughly twice a week and use them every day for music plus Zoom. The multipoint connection is stable between MacBook and iPhone, which is the feature I now miss whenever I use anything else.",
        datePublished: "2026-02-04",
      },
      {
        author: "Thomas G.",
        location: "Bristol, UK",
        rating: 4,
        title: "Comfortable and polished, just a bit warm after long sessions",
        body:
          "Very strong call quality and a tidy fold-flat case. After three or four hours the cups do get a little warm, but the sound is balanced and much less fatiguing than the brighter headphones I tried before these.",
        datePublished: "2026-02-27",
      },
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
    longDescription: [
      "Smart Mug is designed for desk workers who keep reheating coffee, tea, or matcha throughout the day. Instead of aggressively boiling the drink, it holds a selected serving temperature steadily, which means the first and last sip taste much closer together.",
      "The mug uses a stainless-steel inner chamber for even heat transfer, while the weighted charging coaster keeps it topped up through the day. Physical controls on the base let buyers use it without an app, which tends to be a strong purchase driver for customers who want convenience without another connected setup.",
      "From a product-enrichment perspective, the most relevant details are real-world heat retention, cleaning simplicity, battery endurance away from the coaster, and whether the mug feels premium enough to justify the price premium over a standard insulated tumbler.",
    ],
    specs: [
      { label: "Capacity", value: "355 ml / 12 oz" },
      { label: "Temperature range", value: "50 C to 62.5 C" },
      { label: "Battery life", value: "Up to 3 hours off the coaster" },
      { label: "Coaster power", value: "18 W magnetic charging coaster" },
      { label: "Materials", value: "Ceramic-coated stainless steel interior" },
      { label: "Controls", value: "On-mug button plus optional app preset" },
      { label: "Care", value: "Hand-wash body, dishwasher-safe lid" },
    ],
    customerReviews: [
      {
        author: "Natalie C.",
        location: "Leeds, UK",
        rating: 5,
        title: "Actually useful if you forget your coffee constantly",
        body:
          "I work in finance and rarely finish a drink while it is still warm. This mug fixed that immediately. It stays on my coaster most of the day and the temperature feels consistent rather than too hot.",
        datePublished: "2026-01-09",
      },
      {
        author: "Hassan W.",
        location: "Birmingham, UK",
        rating: 4,
        title: "Premium feel and simple controls",
        body:
          "The thing I like most is that it works without needing to open an app every time. Build quality is strong and it looks good on a desk. I only wish the battery away from the charger lasted a little longer for long meetings.",
        datePublished: "2026-02-12",
      },
      {
        author: "Ellie P.",
        location: "Glasgow, UK",
        rating: 5,
        title: "Great gift and surprisingly practical",
        body:
          "Bought one for myself after gifting one at Christmas. Tea stays at a proper drinking temperature instead of turning stewed on a hot plate. Cleaning has been easy and the lid does not trap smells.",
        datePublished: "2026-03-03",
      },
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
    longDescription: [
      "Ergonomic Chair is aimed at customers who sit for long stretches and want more than a cosmetic gaming-chair silhouette. The design focuses on lower-back support, adjustable arm positioning, and a seat base that stays supportive without feeling too rigid after several hours.",
      "The mesh back keeps airflow moving better than padded executive chairs, while the lumbar system adapts to recline changes instead of pressing in one fixed spot. Seat depth, arm width, and tilt tension are all easy to reach from a seated position, which matters because buyers often abandon chairs with adjustment systems they never actually use.",
      "This is the type of product buyers research carefully, so richer on-page specs matter: weight rating, adjustment range, material choices, warranty coverage, and whether the chair arrives mostly assembled. Strong review content also helps because shoppers are usually looking for comfort feedback from people who work full days at a desk.",
    ],
    specs: [
      { label: "Recommended user height", value: "160 cm to 195 cm" },
      { label: "Weight capacity", value: "136 kg / 300 lb" },
      { label: "Seat height range", value: "46 cm to 56 cm" },
      { label: "Armrests", value: "4D adjustment: height, width, depth, pivot" },
      { label: "Back material", value: "Breathable woven mesh" },
      { label: "Recline", value: "3-position lock with tension control" },
      { label: "Assembly", value: "Estimated 20 to 25 minutes" },
    ],
    customerReviews: [
      {
        author: "Marcus L.",
        location: "Edinburgh, UK",
        rating: 5,
        title: "My back noticed the difference within a week",
        body:
          "I moved from a cheap office chair and the lumbar support on this is much better judged. It supports without digging in, and the armrest range is wide enough that I could finally set them properly for typing.",
        datePublished: "2026-01-22",
      },
      {
        author: "Sophie K.",
        location: "Liverpool, UK",
        rating: 5,
        title: "Feels premium and adjusts quickly",
        body:
          "Assembly was straightforward and the instructions were clear. The chair feels stable even at full recline and the mesh back has been a huge upgrade compared with my old padded chair in a warm room.",
        datePublished: "2026-02-16",
      },
      {
        author: "James T.",
        location: "Oxford, UK",
        rating: 4,
        title: "Excellent support, seat base is on the firmer side",
        body:
          "Support and build quality are excellent and the casters are genuinely quiet on wood flooring. The seat is firmer than I expected, but after a few days I preferred it to the softer cushion I had before.",
        datePublished: "2026-03-06",
      },
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
    longDescription: [
      "Desk Lamp Pro is designed to solve the two biggest complaints with cheap desk lamps: glare and uneven light spread. The light bar is wide enough to illuminate a laptop-and-notebook setup, and the diffuser softens hotspots so the desk feels evenly lit during late work sessions.",
      "A built-in ambient sensor can adjust output automatically, but there are also manual brightness and color-temperature controls for users who want a warmer evening scene or a cooler, clearer light for detailed tasks. The high CRI output also makes it more suitable for design work, product photography touch-ups, and handwritten note-taking.",
      "For enrichment, this page now exposes the details shoppers typically compare: lumen output, color temperature range, arm reach, desk clamp dimensions, charging options, and how well the lamp reduces reflected glare on monitors.",
    ],
    specs: [
      { label: "Brightness", value: "Up to 900 lumens" },
      { label: "Color temperature", value: "2700 K to 6500 K" },
      { label: "Color rendering", value: "CRI 95" },
      { label: "Control methods", value: "Touch bar plus gesture wake" },
      { label: "Reach", value: "74 cm max horizontal coverage" },
      { label: "Mounting", value: "Desk clamp fits surfaces up to 5.5 cm" },
      { label: "Extra power", value: "USB-C 18 W device charging port" },
    ],
    customerReviews: [
      {
        author: "Amina S.",
        location: "Nottingham, UK",
        rating: 5,
        title: "The wide light bar makes a huge difference",
        body:
          "I use this for sketching and laptop work, and it lights the whole desk instead of creating one bright circle. Auto brightness is more useful than I expected and keeps evening light comfortable.",
        datePublished: "2026-01-14",
      },
      {
        author: "Ben H.",
        location: "Cambridge, UK",
        rating: 4,
        title: "Clean design and good monitor glare control",
        body:
          "The clamp is solid and the arm stays where you put it. It is bright enough for my setup without bouncing too much light back off the monitor. Gesture control works, though I still mostly use the touch strip.",
        datePublished: "2026-02-08",
      },
      {
        author: "Rachel D.",
        location: "Sheffield, UK",
        rating: 5,
        title: "Looks premium and feels built to last",
        body:
          "I wanted something that looked more refined than the plastic lamps I kept replacing. This feels sturdy, the finish is good, and the USB-C port has been handy for topping up my phone while I work.",
        datePublished: "2026-03-01",
      },
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
    longDescription: [
      "Webcam 4K is aimed at hybrid workers and small teams who want a cleaner upgrade than the soft, noisy cameras built into most laptops. It produces sharper detail for client meetings and lets users step up to 1080p at higher frame rates when smoother motion matters more than maximum resolution.",
      "The camera uses automatic exposure and framing to keep faces centered, but it avoids the exaggerated digital zoom effect common in cheaper tracking webcams. Dual microphones with noise reduction help for quick calls, while the included privacy cap matters for users who leave the webcam mounted all day.",
      "For shoppers comparing webcams, the most important details tend to be real low-light performance, autofocus reliability, field of view, mounting flexibility, and whether the image still looks natural once meeting apps apply their own compression.",
    ],
    specs: [
      { label: "Resolution", value: "4K at 30 fps, 1080p at 60 fps" },
      { label: "Sensor", value: "1/2.8-inch CMOS sensor" },
      { label: "Field of view", value: "90-degree diagonal" },
      { label: "Focus", value: "Phase-detect autofocus with face tracking" },
      { label: "Microphones", value: "Dual noise-reduction beamforming mics" },
      { label: "Connection", value: "USB-C to USB-A cable included" },
      { label: "Privacy", value: "Magnetic privacy shutter in box" },
    ],
    customerReviews: [
      {
        author: "Chris N.",
        location: "Reading, UK",
        rating: 5,
        title: "A clear upgrade from built-in laptop cameras",
        body:
          "Image quality is noticeably sharper and more flattering than my MacBook camera, especially in winter light. Autofocus has been reliable and I like that the framing adjustment is subtle rather than jumpy.",
        datePublished: "2026-01-11",
      },
      {
        author: "Laura B.",
        location: "York, UK",
        rating: 4,
        title: "Great video, microphones are good for quick calls",
        body:
          "For presentations and team meetings this has been excellent. The picture looks crisp even in my home office where light changes through the day. I still use a separate mic for webinars, but the built-in pair is decent for normal calls.",
        datePublished: "2026-02-10",
      },
      {
        author: "Owen P.",
        location: "Cardiff, UK",
        rating: 4,
        title: "Strong detail and good privacy cover",
        body:
          "Setup was plug-and-play on Windows and the included privacy cap is better than the flimsy sliders I have seen on cheaper webcams. I knocked off one star because the auto exposure sometimes brightens a little too slowly after a dark screen share.",
        datePublished: "2026-03-05",
      },
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
    longDescription: [
      "Standing Desk Lite is designed for buyers who want the everyday benefits of a sit-stand desk without jumping to oversized executive frames. The lift is smooth, the controls are simple, and the included cable tray helps the setup look finished rather than improvised.",
      "Dual motors keep the movement steady under normal workstation loads, and the frame remains stable enough for laptop, monitor arm, and accessory setups used in home offices or smaller team spaces. The anti-collision feature is especially relevant for users with drawers, chairs, or under-desk storage nearby.",
      "This category tends to benefit heavily from visible specs and review detail because buyers compare travel range, stability at standing height, operating noise, desktop depth, and the overall sense of quality once assembled. Those details are now present directly on the page.",
    ],
    specs: [
      { label: "Desktop size", value: "140 cm x 70 cm" },
      { label: "Height range", value: "72 cm to 120 cm" },
      { label: "Lift speed", value: "32 mm per second" },
      { label: "Noise level", value: "Under 45 dB in normal operation" },
      { label: "Load capacity", value: "100 kg" },
      { label: "Memory presets", value: "3 programmable heights" },
      { label: "Included accessories", value: "Cable tray, headphone hook, leveling feet" },
    ],
    customerReviews: [
      {
        author: "Fiona J.",
        location: "Brighton, UK",
        rating: 5,
        title: "Stable enough for my monitor arm setup",
        body:
          "I was worried a lighter desk would wobble too much, but it has been very solid with a 27-inch monitor, laptop stand, and speakers. The memory presets make it easy to actually use the standing function every day.",
        datePublished: "2026-01-26",
      },
      {
        author: "Peter V.",
        location: "Newcastle, UK",
        rating: 4,
        title: "Quiet motors and clean finish",
        body:
          "Assembly took me just under an hour on my own and everything lined up properly. The motors are quieter than I expected and the included cable tray saves buying extras straight away.",
        datePublished: "2026-02-19",
      },
      {
        author: "Grace E.",
        location: "Southampton, UK",
        rating: 5,
        title: "A good size for a home office without feeling cramped",
        body:
          "The desk fits nicely in a spare room but still gives enough depth for a proper monitor and notebook. Anti-collision has already saved me once when I left a chair arm tucked under the desk.",
        datePublished: "2026-03-08",
      },
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
