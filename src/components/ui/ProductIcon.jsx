import React from "react";

const paths = {
  shield: <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />,
  check: <polyline points="20 6 9 17 4 12" />,
  wallet: (
    <>
      <path d="M21 7H5a2 2 0 0 1 0-4h12v4" />
      <path d="M21 7v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7" />
      <circle cx="17" cy="13" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  gem: <path d="M6 3h12l4 6-10 12L2 9z" />,
  pencil: <path d="M17 3a2.83 2.83 0 0 1 4 4L7 21l-4 1 1-4z" />,
  gift: (
    <>
      <rect x="3" y="8" width="18" height="13" rx="1" />
      <path d="M3 12h18" />
      <path d="M12 8v13" />
      <path d="M12 8c-1.5-3-5-4.5-6-2.5S8 8 12 8c4 0-1.5-4.5-6-2.5S7 8 12 8z" />
    </>
  ),
  chevronDown: <polyline points="6 9 12 15 18 9" />,
  chevronRight: <polyline points="9 18 15 12 9 6" />,
  close: (
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>
  ),
  filter: <path d="M22 3H2l8 9.46V19l4 2v-8.54z" />,
  whatsapp: (
    <path
      d="M17.5 14.4c-.3-.15-1.74-.86-2-.96-.27-.1-.47-.15-.66.15-.2.3-.76.95-.93 1.15-.17.2-.34.22-.64.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.61.14-.14.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.66-1.6-.91-2.19-.24-.58-.48-.5-.66-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.47 0 1.46 1.06 2.87 1.2 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.74-.71 1.99-1.4.25-.68.25-1.27.17-1.4-.07-.12-.27-.2-.57-.34z"
      fill="currentColor"
      stroke="none"
    />
  ),
  eye: (
    <>
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  star: (
    <path d="M12 2.5l2.95 6.4 6.95.8-5.1 4.85 1.4 6.95L12 17.9l-6.2 3.6 1.4-6.95-5.1-4.85 6.95-.8z" />
  ),
  arrowRight: (
    <>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </>
  ),
};

const ProductIcon = ({ name, size = 18, className = "", strokeWidth = 1.7 }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {paths[name] || null}
  </svg>
);

export default ProductIcon;
