import React from "react";

const paths = {
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  whatsapp: (
    <path d="M17.5 14.4c-.3-.15-1.74-.86-2-.96-.27-.1-.47-.15-.66.15-.2.3-.76.95-.93 1.15-.17.2-.34.22-.64.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.61.14-.14.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.66-1.6-.91-2.19-.24-.58-.48-.5-.66-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.47 0 1.46 1.06 2.87 1.2 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.74-.71 1.99-1.4.25-.68.25-1.27.17-1.4-.07-.12-.27-.2-.57-.34z" fill="currentColor" stroke="none" />
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6l-10 7L2 6" />
    </>
  ),
  pin: (
    <>
      <path d="M21 10c0 6.5-9 12-9 12s-9-5.5-9-12a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </>
  ),
  consultation: (
    <>
      <circle cx="9" cy="9" r="3.5" />
      <path d="M3.5 19c.6-2.8 3-5 5.5-5s4.9 2.2 5.5 5" />
      <circle cx="17.5" cy="9.5" r="3.5" strokeDasharray="2 2" />
    </>
  ),
  star: (
    <path d="M12 2.5l2.95 6.4 6.95.8-5.1 4.85 1.4 6.95L12 17.9l-6.2 3.6 1.4-6.95-5.1-4.85 6.95-.8z" />
  ),
  badge: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="M9 14.5L7 22l5-3 5 3-2-7.5" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 2h12v19l-3-2-3 2-3-2-3 2V2z" />
      <line x1="9" y1="7" x2="15" y2="7" />
      <line x1="9" y1="11" x2="15" y2="11" />
    </>
  ),
  design: (
    <>
      <path d="M17 3a2.83 2.83 0 0 1 4 4L7 21l-4 1 1-4z" />
    </>
  ),
  history: (
    <>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <polyline points="3 3 3 8 8 8" />
      <polyline points="12 7 12 12 15.5 14" />
    </>
  ),
  chevronDown: (
    <polyline points="6 9 12 15 18 9" />
  ),
  marker: (
    <>
      <path d="M21 10c0 6.5-9 12-9 12s-9-5.5-9-12a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  directions: (
    <>
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </>
  ),
};

const ContactIcon = ({ name, size = 20, className = "", strokeWidth = 1.7 }) => (
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

export default ContactIcon;
