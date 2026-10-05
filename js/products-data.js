/* ==========================================================================
   SPORTS STORE - PRODUCTS & CATEGORIES DATASET (LOCAL ASSETS)
   ========================================================================== */

const PRODUCTS_DATA = [
  {
    id: "prod-101",
    name: "Apex Elite Carbon Tennis Racket",
    category: "Equipment",
    sport: "Tennis",
    brand: "Apex Pro",
    price: 189.99,
    originalPrice: 229.99,
    discount: 17,
    badge: "Top Seller",
    badgeType: "top",
    rating: 4.9,
    reviewsCount: 128,
    image: "assets/images/prod-tennis-racket.webp",
    description: "Designed for high-velocity baseliners. Precision graphite frame with high-density foam fill for vibration reduction and maximum power delivery.",
    colors: ["Cyber Cyan", "Obsidian Black", "Ember Gold"],
    sizes: ["G2 (4 1/4\")", "G3 (4 3/8\")", "G4 (4 1/2\")"],
    specs: {
      "Weight": "300g",
      "Head Size": "100 sq. in",
      "Balance": "320mm",
      "String Pattern": "16x19"
    },
    inStock: true
  },
  {
    id: "prod-102",
    name: "Phantom Precision Match Football",
    category: "Equipment",
    sport: "Football",
    brand: "Nike Tech",
    price: 64.99,
    originalPrice: 79.99,
    discount: 18,
    badge: "Official Match",
    badgeType: "new",
    rating: 4.8,
    reviewsCount: 94,
    image: "assets/images/prod-football.webp",
    description: "FIFA Quality Pro certified match ball with Aerowsculpt grooves for true flight trajectory and thermal-bonded seamless surface.",
    colors: ["Electric Neon", "Classic White"],
    sizes: ["Size 5", "Size 4"],
    specs: {
      "Material": "PU Leather",
      "Construction": "Thermal Bonded",
      "Certification": "FIFA Quality Pro"
    },
    inStock: true
  },
  {
    id: "prod-103",
    name: "HyperGrip Pro Basketball Shoes",
    category: "Footwear",
    sport: "Basketball",
    brand: "Apex Pro",
    price: 149.99,
    originalPrice: 179.99,
    discount: 16,
    badge: "Sale",
    badgeType: "sale",
    rating: 4.9,
    reviewsCount: 210,
    image: "assets/images/prod-basketball-shoes.webp",
    description: "Unmatched ankle support with dual-density foam responsive cushioning and multidirectional traction rubber outsole for fast cuts.",
    colors: ["Red Neon", "Cyber Black", "Volt Yellow"],
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    specs: {
      "Midsole": "Apex Nitro Foam",
      "Upper": "Engineered FlyMesh",
      "Weight": "380g"
    },
    inStock: true
  },
  {
    id: "prod-104",
    name: "Vortex Pro Carbon Running Shoes",
    category: "Footwear",
    sport: "Running",
    brand: "Adidas Tech",
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    badge: "Hot",
    badgeType: "sale",
    rating: 5.0,
    reviewsCount: 312,
    image: "assets/images/prod-running-shoes.webp",
    description: "Marathon-ready propulsion running shoes equipped with a full-length carbon fibre plate and ultra-lightweight foam.",
    colors: ["Electric Cyan", "Triple Black"],
    sizes: ["US 7.5", "US 8.5", "US 9.5", "US 10.5", "US 11.5"],
    specs: {
      "Drop": "8mm",
      "Weight": "195g",
      "Plate": "100% Carbon Fibre"
    },
    inStock: true
  },
  {
    id: "prod-105",
    name: "Titan Hydro-Flex Swim Goggles",
    category: "Accessories",
    sport: "Swimming",
    brand: "Speedo Tech",
    price: 34.99,
    originalPrice: 44.99,
    discount: 22,
    badge: "Best Seller",
    badgeType: "top",
    rating: 4.7,
    reviewsCount: 86,
    image: "assets/images/prod-swim-goggles.webp",
    description: "Anti-fog wide-angle mirrored lenses with liquid silicone 3D seals for leak-proof comfort in competitive racing.",
    colors: ["Mirror Cyan", "Smoke Grey", "Gold Chrome"],
    sizes: ["One Size"],
    specs: {
      "Lens": "Polycarbonate Mirrored",
      "UV Protection": "UV400",
      "Seal": "3D Silicone"
    },
    inStock: true
  },
  {
    id: "prod-106",
    name: "Apex Aero-Dry Compression Jersey",
    category: "Apparel",
    sport: "Fitness",
    brand: "Under Armour",
    price: 49.99,
    originalPrice: 59.99,
    discount: 16,
    badge: "New",
    badgeType: "new",
    rating: 4.8,
    reviewsCount: 154,
    image: "assets/images/prod-compression-jersey.webp",
    description: "Sweat-wicking 4-way stretch compression apparel designed to reduce muscle fatigue and regulate body temperature.",
    colors: ["Slate Grey", "Midnight Black", "Neon Blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    specs: {
      "Fabric": "85% Polyester, 15% Elastane",
      "Fit": "Compression",
      "Technology": "Aero-Dry"
    },
    inStock: true
  },
  {
    id: "prod-107",
    name: "Pulse Smart Sport GPS Watch",
    category: "Accessories",
    sport: "Running",
    brand: "Garmin Tech",
    price: 279.99,
    originalPrice: 329.99,
    discount: 15,
    badge: "Tech Favorite",
    badgeType: "top",
    rating: 4.9,
    reviewsCount: 175,
    image: "assets/images/prod-smart-watch.webp",
    description: "Multi-sport smartwatch with heart rate monitoring, VO2 Max calculations, built-in GPS maps, and 14-day battery life.",
    colors: ["Stealth Black", "Titanium Silver"],
    sizes: ["42mm", "46mm"],
    specs: {
      "Battery Life": "Up to 14 Days",
      "Water Rating": "50m (5 ATM)",
      "Display": "AMOLED Touchscreen"
    },
    inStock: true
  },
  {
    id: "prod-108",
    name: "Apex Iron Grip Rubber Dumbbell Set",
    category: "Equipment",
    sport: "Fitness",
    brand: "Apex Pro",
    price: 119.99,
    originalPrice: 149.99,
    discount: 20,
    badge: "Heavy Duty",
    badgeType: "sale",
    rating: 4.8,
    reviewsCount: 99,
    image: "assets/images/prod-dumbbells.webp",
    description: "Hexagonal anti-roll rubber coated dumbbells with ergonomically knurled chrome steel handles for maximum grip stability.",
    colors: ["Black / Chrome"],
    sizes: ["Pair of 10kg", "Pair of 15kg", "Pair of 20kg"],
    specs: {
      "Material": "Solid Cast Iron + Virgin Rubber",
      "Grip": "Knurled Chrome Steel"
    },
    inStock: true
  },
  {
    id: "prod-109",
    name: "Pro-Flex High-Density Training Mat",
    category: "Equipment",
    sport: "Fitness",
    brand: "Apex Pro",
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    badge: "Essential",
    badgeType: "new",
    rating: 4.8,
    reviewsCount: 142,
    image: "assets/images/prod-yoga-mat.webp",
    description: "Non-slip 12mm eco-friendly TPE workout mat with alignment grid and carrying strap. Ideal for floor conditioning and mobility drills.",
    colors: ["Obsidian Black", "Steel Grey"],
    sizes: ["Standard 183x61cm"],
    specs: {
      "Thickness": "12mm",
      "Material": "Eco-TPE",
      "Grip": "Double-sided Non-slip"
    },
    inStock: true
  }
];

// CATEGORIES METADATA
const CATEGORIES_DATA = [
  {
    name: "Football",
    count: "45+ Products",
    image: "assets/images/category-football.webp"
  },
  {
    name: "Basketball",
    count: "38+ Products",
    image: "assets/images/category-basketball.webp"
  },
  {
    name: "Tennis",
    count: "29+ Products",
    image: "assets/images/category-tennis.webp"
  },
  {
    name: "Running",
    count: "60+ Products",
    image: "assets/images/category-running.webp"
  },
  {
    name: "Fitness",
    count: "75+ Products",
    image: "assets/images/category-fitness.webp"
  },
  {
    name: "Swimming",
    count: "32+ Products",
    image: "assets/images/category-swimming.webp"
  }
];
