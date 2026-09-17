// ── Recently viewed — local storage utility ───────────────────────
const RV_KEY = "uj_recently_viewed";
const RV_MAX = 10;

export function addToRecentlyViewed(product) {
  try {
    const existing = getRecentlyViewed();
    const filtered = existing.filter((p) => p.id !== product.id);
    const updated = [
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        collectionName: product.collectionName,
        metalTypeLabel: product.metalTypeLabel,
        images: product.images,
      },
      ...filtered,
    ].slice(0, RV_MAX);
    localStorage.setItem(RV_KEY, JSON.stringify(updated));
  } catch (_) {}
}

export function getRecentlyViewed() {
  try {
    return JSON.parse(localStorage.getItem(RV_KEY) || "[]");
  } catch (_) {
    return [];
  }
}
