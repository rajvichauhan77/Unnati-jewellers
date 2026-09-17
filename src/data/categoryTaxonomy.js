// ── Category Taxonomy ─────────────────────────────────────────────
// Drives: Collections page filters, Product page sidebar (cascading
// category → subcategory), and admin panel category management.
// Replace with API call later: GET /api/categories

export const categoryTaxonomy = [
  {
    id: "men",
    label: "Men",
    subcategories: [
      { id: "men-rings", label: "Rings" },
      { id: "men-chains", label: "Chains" },
      { id: "men-mala", label: "Mala" },
      { id: "men-watch", label: "Watch" },
      { id: "men-kada", label: "Kada" },
      { id: "men-bracelet", label: "Bracelet" },
      { id: "men-lucky", label: "Lucky" },
      { id: "men-pendant", label: "Pendant" },
      { id: "men-studs", label: "Studs" },
    ],
  },
  {
    id: "women",
    label: "Women",
    subcategories: [
      { id: "women-rings", label: "Rings" },
      { id: "women-earrings", label: "Earrings" },
      { id: "women-necklace", label: "Necklace" },
      { id: "women-pendant", label: "Pendant" },
      { id: "women-chains", label: "Chains" },
      { id: "women-mangalsutra", label: "Mangalsutra" },
      { id: "women-pocho", label: "Pocho" },
      { id: "women-bangles", label: "Bangles" },
      { id: "women-bracelet", label: "Bracelet" },
      { id: "women-nosepin", label: "Nosepin" },
      { id: "women-anklet", label: "Anklet" },
      { id: "women-payal", label: "Payal" },
      { id: "women-damini", label: "Damini" },
      { id: "women-tiko", label: "Tiko" },
      { id: "women-judo", label: "Judo" },
      { id: "women-necklace-set", label: "Necklace Set" },
      { id: "women-studs", label: "Studs" },
      { id: "women-kaan-sar", label: "Kaan Sar" },
      { id: "women-foot-ring", label: "Foot Ring" },
      { id: "women-kandoro", label: "Kandoro" },
      { id: "women-bali", label: "Bali" },
    ],
  },
  {
    id: "kids",
    label: "Kids",
    subcategories: [
      { id: "kids-kadli", label: "Kadli" },
      { id: "kids-pendant", label: "Pendant" },
      { id: "kids-earring", label: "Earring" },
      { id: "kids-nosepin", label: "Nosepin" },
      { id: "kids-ring", label: "Ring" },
      { id: "kids-chain", label: "Chain" },
    ],
  },
  {
    id: "bridal",
    label: "Bridal Wear",
    subcategories: [
      { id: "bridal-traditional-gold-set", label: "Traditional Gold Set" },
      { id: "bridal-antique-jewellery", label: "Antique Jewellery" },
      { id: "bridal-polki-jewellery", label: "Polki Jewellery" },
      { id: "bridal-payal", label: "Bridal Payal" },
      { id: "bridal-chudi", label: "Bridal Chudi" },
      { id: "bridal-damini", label: "Damini" },
      { id: "bridal-tiko", label: "Tiko" },
      { id: "bridal-nath", label: "Nath" },
      { id: "bridal-kandoro", label: "Kandoro" },
      { id: "bridal-bajuband", label: "Bajuband" },
      { id: "bridal-ring", label: "Ring" },
    ],
  },
];

// Flat lookup: subcategory id -> { label, parentId, parentLabel }
export const subcategoryLookup = categoryTaxonomy.reduce((acc, cat) => {
  cat.subcategories.forEach((sub) => {
    acc[sub.id] = { ...sub, parentId: cat.id, parentLabel: cat.label };
  });
  return acc;
}, {});

// ── Filter option lists ───────────────────────────────────────────
export const metalTypes = [
  { id: "gold", label: "Gold" },
  { id: "silver", label: "Silver" },
  { id: "24k", label: "24k Gold" },
  { id: "22k", label: "22k Gold" },
  { id: "20k", label: "20k Gold" },
  { id: "18k", label: "18k Gold" },
  { id: "14k", label: "14k Gold" },
  { id: "gold-24k", label: "24k Gold" },
  { id: "gold-22k", label: "22k Gold" },
  { id: "gold-20k", label: "20k Gold" },
  { id: "gold-18k", label: "18k Gold" },
  { id: "gold-14k", label: "14k Gold" },
  { id: "silver999", label: "Silver 999" },
  { id: "silver925", label: "Silver 925" },
  { id: "Silver999", label: "Silver 999" },
  { id: "Silver925", label: "Silver 925" },
];

export const stoneTypes = [
  { id: "diamond", label: "Diamond" },
  { id: "ruby", label: "Ruby" },
  { id: "emerald", label: "Emerald" },
  { id: "pearl", label: "Pearl" },
  { id: "no-stone", label: "No Stone" },
];

export const genderOptions = [
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "kids", label: "Kids" },
  { id: "unisex", label: "Unisex" },
];

export const occasionOptions = [
  { id: "bridal", label: "Bridal" },
  { id: "daily-wear", label: "Daily Wear" },
  { id: "party", label: "Party" },
  { id: "festive", label: "Festive" },
];

export const purityOptions = [
  { id: "24k", label: "24 Karat" },
  { id: "22k", label: "22 Karat" },
  { id: "18k", label: "18 Karat" },
  { id: "14k", label: "14 Karat" },
];

export const sortOptions = [
  { id: "newest", label: "Newest First" },
  { id: "price-low-high", label: "Price: Low to High" },
  { id: "price-high-low", label: "Price: High to Low" },
  { id: "popularity", label: "Popularity" },
];

export const priceRangeBounds = { min: 0, max: 500000 };
export const weightRangeBounds = { min: 0, max: 200 }; // grams
