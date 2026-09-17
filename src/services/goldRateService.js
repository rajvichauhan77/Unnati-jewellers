const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.unnatijewellers.com/api/v1';
const API_KEY = import.meta.env.VITE_API_KEY || 'Au7Kv7L7LhtLcS5XTABzc2S55aybYnZnkMQeG5gOOQuW83TVQk5v2CLdjfmN/rrSu4q1gMjAJ7WsDXVrP4/ZYQ==';

let cachedRatesPromise = null;
let cachedRatesTime = 0;

export const fetchLatestRates = async () => {
  const now = Date.now();
  if (cachedRatesPromise && (now - cachedRatesTime < 10000)) {
    return cachedRatesPromise;
  }

  cachedRatesTime = now;
  cachedRatesPromise = (async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/live-rates/latest`, {
        headers: {
          'x-api-key': API_KEY
        }
      });
      if (!res.ok) throw new Error('Failed to fetch latest rates');
      const json = await res.json();
      return json.data;
    } catch (error) {
      // Clear cache on failure so it can retry
      cachedRatesPromise = null;
      cachedRatesTime = 0;
      throw error;
    }
  })();

  return cachedRatesPromise;
};

export const fetchGoldRate = async () => {
  try {
    const data = await fetchLatestRates();
    return {
      rate24kt: Math.round(data.goldCalculated.k24),
      rate22kt: Math.round(data.goldCalculated.k22),
      rate20kt: Math.round(data.goldCalculated.k20),
      rate18kt: Math.round(data.goldCalculated.k18),
      currency: "₹",
      unit: "g",
      lastUpdated: data.updatedAt || new Date().toISOString()
    };
  } catch (error) {
    throw new Error('Failed to fetch gold rate');
  }
};

export const fetchGoldRateHistory = async () => {
  const res = await fetch(`${API_BASE_URL}/live-rates/history?limit=15000`, {
    headers: {
      'x-api-key': API_KEY
    }
  });
  if (!res.ok) throw new Error('Failed to fetch history');
  const json = await res.json();
  return json.data || [];
};
