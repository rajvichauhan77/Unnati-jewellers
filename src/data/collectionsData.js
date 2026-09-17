// â”€â”€ Collections Page Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// All sections here are admin-editable; replace with API calls later.

// ── Collection Banner Images (Horizontal for All Screens) ──
import dw1 from "../assets/temp/collection banner/Daily-wear-1.webp";
import dw3 from "../assets/temp/collection banner/daily-wear-3.webp";
import dw5 from "../assets/temp/collection banner/daily-wear-6.webp";

import bridal1 from "../assets/temp/collection banner/bridal-1.webp";
import bridal3 from "../assets/temp/collection banner/bridal-3.webp";
import bridal5 from "../assets/temp/collection banner/bridal-5.webp";

import gift1 from "../assets/temp/collection banner/Gifting-1.webp";
import gift3 from "../assets/temp/collection banner/gift-5.webp";
import gift5 from "../assets/temp/collection banner/gift-5.webp";

import kid1 from "../assets/temp/collection banner/kid-1.webp";
import kid3 from "../assets/temp/collection banner/kid-3.webp";
import kid5 from "../assets/temp/collection banner/kisd-5.webp";

import men1 from "../assets/temp/collection banner/men-1.webp";
import men3 from "../assets/temp/collection banner/men-3.webp";
import men5 from "../assets/temp/collection banner/men-5.webp";

import spiritual1 from "../assets/temp/collection banner/spiritual-1.webp";
import spiritual3 from "../assets/temp/collection banner/spiritual-3.webp";
import spiritual5 from "../assets/temp/collection banner/spiritual-5.webp";

export const collectionBannerSets = {
  dailyWear: [dw1, dw3, dw5],
  bridal: [bridal1, bridal3, bridal5],
  gifting: [gift1, gift3, gift5],
  kids: [kid1, kid3, kid5],
  men: [men1, men3, men5],
  spiritual: [spiritual1, spiritual3, spiritual5],
};



// â”€â”€ C. The Pillars of Our Promise (admin-editable list) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// GET /api/promise-pillars
export const promisePillars = {
  title: "The Pillars of Our Promise",
  subtitle:
    "Building relationships beyond transactions, founded on the principles of trust and transparency for over three decades.",
  pillars: [
    { id: 1, icon: "shield",   label: "30+ Years Trust" },
    { id: 2, icon: "check",    label: "BIS Hallmarked" },
    { id: 3, icon: "wallet",   label: "Transparent Price" },
    { id: 4, icon: "gem",      label: "Pure Materials" },
    { id: 5, icon: "pencil",   label: "Expert Craft" },
    { id: 6, icon: "gift",     label: "Loyalty Perks" },
  ],
};

export const featuredCollections = [
  {
    id: "bridal-collection",
    title: "Bridal Collection",
    subtitle: "Made for Her Golden Moments",
    bannerImages: collectionBannerSets.bridal,
    bannerImage: collectionBannerSets.bridal[0],
    link: "/collection/grand-heritage-necklaces/products",
    items: [],
  },
  {
    id: "daily-wear",
    title: "Daily Wear",
    subtitle: "Wear Your Elegance, Every Day",
    bannerImages: collectionBannerSets.dailyWear,
    bannerImage: collectionBannerSets.dailyWear[0],
    link: "/collection/mangalsutra-edit/products",
    items: [],
  },
  {
    id: "mens-collection",
    title: "Men's Collection",
    subtitle: "Gold Crafted for the Modern Man.",
    bannerImages: collectionBannerSets.men,
    bannerImage: collectionBannerSets.men[0],
    link: "/collection/men-chains/products",
    items: [],
  },
  {
    id: "kids-collection",
    title: "Kid's Collection",
    subtitle: "Little Smiles, Golden Moments",
    bannerImages: collectionBannerSets.kids,
    bannerImage: collectionBannerSets.kids[0],
    link: "/collection/kids-collection/products",
    items: [],
  },
  {
    id: "spiritual-collection",
    title: "Spiritual Collection",
    subtitle: "Wear Your Faith, Carry Its Grace",
    bannerImages: collectionBannerSets.spiritual,
    bannerImage: collectionBannerSets.spiritual[0],
    link: "/collection/spiritual-collection/products",
    items: [],
  },
  {
    id: "gifting-collection",
    title: "Gifting Collection",
    subtitle: "Give a Gift That Lasts Forever",
    bannerImages: collectionBannerSets.gifting,
    bannerImage: collectionBannerSets.gifting[0],
    link: "/collection/kundan-sets/products",
    items: [],
  },
];


