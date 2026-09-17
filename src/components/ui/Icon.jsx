import React from "react";

const icons = {
  necklace: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6 C 4 15, 20 15, 20 6" />
      <path d="M12 13.5 L14.5 17 L12 20.5 L9.5 17 Z" />
      <circle cx="12" cy="13.5" r="0.8" fill="currentColor" />
      <circle cx="8" cy="11.5" r="1" fill="currentColor" />
      <circle cx="16" cy="11.5" r="1" fill="currentColor" />
    </svg>
  ),
  ring: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6 C 4 15, 20 15, 20 6" />
      <path d="M12 13.5 L14.5 17 L12 20.5 L9.5 17 Z" />
      <circle cx="12" cy="13.5" r="0.8" fill="currentColor" />
      <circle cx="8" cy="11.5" r="1" fill="currentColor" />
      <circle cx="16" cy="11.5" r="1" fill="currentColor" />
    </svg>
  ),
  gold: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12,2 15.5,8.5 23,9.3 17.5,14.5 19.1,22 12,18.3 4.9,22 6.5,14.5 1,9.3 8.5,8.5" />
    </svg>
  ),
  silver: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12 Q12 6 16 12 Q12 18 8 12Z" />
    </svg>
  ),
  earrings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3 Q8 6 8 8" />
      <circle cx="8" cy="10" r="2" />
      <path d="M8 12 L6 18 Q8 21 10 18 L8 12" />
      <path d="M16 3 Q16 6 16 8" />
      <circle cx="16" cy="10" r="2" />
      <path d="M16 12 L14 18 Q16 21 18 18 L16 12" />
    </svg>
  ),
  rings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="14" rx="7" ry="4" />
      <path d="M5 14 L5 10 Q5 6 12 6 Q19 6 19 10 L19 14" />
    </svg>
  ),
  gemstone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 L20 8 L17 20 L7 20 L4 8 Z" />
      <path d="M4 8 L12 14 L20 8" />
      <path d="M12 14 L12 20" />
      <path d="M12 2 L12 14" />
    </svg>
  ),
  wedding: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="14" r="4" />
      <circle cx="16" cy="14" r="4" />
      <path d="M8 10 Q12 4 16 10" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21 L16.65 16.65" />
    </svg>
  ),
  menu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  chevronDown: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  chevronRight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
};

const Icon = ({ name, className = "", size = 20 }) => (
  <span
    className={`unnati-icon ${className}`}
    style={{ display: "inline-flex", width: size, height: size, flexShrink: 0 }}
  >
    {icons[name] || null}
  </span>
);

export default Icon;
