import { useState } from "react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import "./SuvarnaScheme.css";
import brochurePdf from "../assets/temp/Suvarna Unnati Scheme Brochure.pdf";
import schemeImg from "../assets/temp/unnati scheme (1).webp";

/* ─── Inline SVG icons ───────────────────────────────────── */
const CheckIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const ChevronIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const DownloadIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const LinkIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const CoinsIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="6" />
    <circle cx="18" cy="18" r="4" />
    <path d="M12 18a6 6 0 0 0-6-6" />
  </svg>
);

const BanknoteIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="12" cy="12" r="2" />
    <line x1="6" y1="12" x2="6.01" y2="12" />
    <line x1="18" y1="12" x2="18.01" y2="12" />
  </svg>
);

const BadgeCheckIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.75z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const AwardIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const SearchIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const SmartphoneIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const LightningIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const HandshakeIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const TrophyIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
    <path d="M12 2a6 6 0 0 1 6 6v3.5a6 6 0 0 1-12 0V8a6 6 0 0 1 6-6z" />
  </svg>
);

const HeadsetIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

const GiftIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);

const UserIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ClipboardIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);

const GemIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12l4 6-10 13L2 9z" />
    <path d="M11 3 8 9l4 13 4-13-3-6" />
    <path d="M2 9h20" />
  </svg>
);

const ClockIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CreditCardIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const LockIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const AndroidIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a4 4 0 0 1 4 4v1h-8V6a4 4 0 0 1 4-4z" />
    <rect x="5" y="8" width="14" height="11" rx="2" />
    <path d="M9 19v3M15 19v3M3 11v5M21 11v5" />
    <circle cx="9" cy="12" r="1" fill="currentColor" />
    <circle cx="15" cy="12" r="1" fill="currentColor" />
  </svg>
);

const PlayStoreIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.25 2.1c-.2.2-.35.5-.35.9v18c0 .4.15.7.35.9l.1.1L13.1 12.3v-.2l-9.75-9.9-.1.1z" fill="#d4af37" />
    <path d="M16.3 15.5l-3.2-3.2v-.2l3.2-3.2.1.1 3.8 2.2c1.1.6 1.1 1.6 0 2.2l-3.8 2.1-.1.1z" fill="#ffffff" />
    <path d="M16.4 15.4l-3.3-3.3-9.85 10c.3.3.9.3 1.5 0l11.65-6.7z" fill="#e0e0e0" />
    <path d="M16.4 8.6L4.75 1.9c-.6-.3-1.2-.3-1.5 0l9.85 10 3.3-3.3z" fill="#ffffff" />
  </svg>
);


const AppleIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.82M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.52-.62.72-1.16 1.86-1.01 2.97 1.12.09 2.27-.6 2.96-1.43z" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MessageSquareIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const StoreIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 20a1 1 0 0 0 1-1V8.5L16 4H8L3 8.5V19a1 1 0 0 0 1 1z" />
    <path d="M3 8h18" />
    <path d="M10 12h4v8h-4z" />
  </svg>
);

const StarIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const FileTextIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

/* ─── QR code SVG ────────────────────────────────────────── */
const APP_STORE_LINK = "https://play.google.com/store/apps/details?id=com.unnati.jewellers&hl=en_IN";

const QRCodeSVG = () => (
  <div style={{ padding: "4px", background: "#ffffff", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
    <QRCode
      value={APP_STORE_LINK}
      size={120}
      fgColor="#810B38"
      bgColor="#ffffff"
      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
      viewBox="0 0 256 256"
    />
  </div>
);

/* ─── Data ───────────────────────────────────────────────── */
const BENEFITS = [
  { icon: <CalendarIcon />, title: "Flexible Monthly Savings" },
  { icon: <AwardIcon />, title: "Two Scheme Options" },
  { icon: <SearchIcon />, title: "Transparent Process" },
  { icon: <SmartphoneIcon />, title: "Secure Digital Records" },
  { icon: <LightningIcon />, title: "Easy UPI Payment" },
  { icon: <HandshakeIcon />, title: "Trusted Since 1992" },
  { icon: <BadgeCheckIcon />, title: "BIS Hallmarked Jewellery" },
  { icon: <HeadsetIcon />, title: "Dedicated Customer Support" },
  { icon: <GiftIcon />, title: "Exclusive Completion Benefits" },
  { icon: <SmartphoneIcon />, title: "Convenient Mobile App" },
];

const STEPS = [
  {
    emoji: <SmartphoneIcon />,
    title: "Download the App",
    desc: "Get the Unnati App from Google Play or App Store",
  },
  {
    emoji: <UserIcon />,
    title: "Register & Login",
    desc: "Create your account with basic details in minutes",
  },
  {
    emoji: <ClipboardIcon />,
    title: "Complete KYC",
    desc: "Verify your identity — quick and fully digital",
  },
  {
    emoji: <GemIcon />,
    title: "Choose Your Scheme",
    desc: "Select Weight Based  or Amount Based scheme",
  },
  {
    emoji: <ClockIcon />,
    title: "Select Duration",
    desc: "Pick 10 + 1 months or 22 months tenure",
  },
  {
    emoji: <CreditCardIcon />,
    title: "Set Your Installment",
    desc: "Start from ₹1,000 in multiples of ₹1,000",
  },
  {
    emoji: <BanknoteIcon />,
    title: "Pay First Installment",
    desc: "Your scheme activates instantly after first payment",
  },
  {
    emoji: <TrendingUpIcon />,
    title: "Track Your Progress",
    desc: "Monitor savings in real-time on the app",
  },
  {
    emoji: <ShoppingBagIcon />,
    title: "Redeem for Jewellery",
    desc: "Shop your dream jewellery at scheme maturity",
  },
];

const TABLE_ROWS = [
  { label: "Minimum Installment", value: "₹1,000 per month", hl: false },
  { label: "Installment Units", value: "Multiples of ₹1,000", hl: false },
  { label: "Maximum Installment", value: "No upper limit", hl: false },
  { label: "Available Durations", value: "10 + 1 Months or 22 Months", hl: true },
  { label: "Payment Method", value: "UPI / Payment Gateway", hl: false },
  { label: "Due Date", value: "Enrollment date each month", hl: false },
  { label: "Cash Redemption", value: "Not allowed", hl: false },
  { label: "Multiple Schemes", value: "Yes — simultaneously", hl: false },
];

const ELIGIBILITY = [
  "Any individual can join the scheme",
  "KYC verification is mandatory before enrollment",
  "No age restrictions (subject to applicable KYC laws)",
  "Scheme is non-transferable to another person",
  "Redeemable only against jewellery purchase at Unnati Jewellers",
  "Missed installments extend the scheme — not cancelled",
  "Company contribution forfeited on pre-maturity cancellation",
];

const FAQS = [
  {
    q: "What is the Suvarna Unnati Scheme?",
    a: "Suvarna Unnati Scheme is a jewellery savings plan by Unnati Jewellers. You save a fixed amount every month through easy digital payments and redeem the accumulated value against jewellery purchase at maturity.",
  },
  {
    q: "What is the difference between Weight Based  and Amount Based Scheme?",
    a: "Weight Based : each installment is converted into gold at the applicable gold rate on the payment date. Amount Based: installments remain as money throughout the tenure. Both are redeemed against jewellery at maturity.",
  },
  {
    q: "What is the minimum monthly installment?",
    a: "The minimum installment is ₹1,000 per month. You can choose any amount in multiples of ₹1,000. There is no upper limit.",
  },
  {
    q: "Can I run multiple schemes at the same time?",
    a: "Yes. You can enrol in multiple active schemes simultaneously, each with its own tenure and installment amount.",
  },
  {
    q: "What happens if I miss an installment?",
    a: "Missing an installment does not cancel your scheme. The scheme simply extends until all required installments are completed successfully.",
  },
  {
    q: "Can I cancel my scheme before maturity?",
    a: "Cancellation is allowed after the first successful installment. Company contribution is forfeited. Amount Based: 100% refund of deposited amount. Weight Based : refund after deducting 20% of one month's installment.",
  },
  {
    q: "How do I redeem my matured scheme?",
    a: "Once all installments are completed, visit our showroom or to initiate redemption. The accumulated value is applied directly to your jewellery purchase. Cash redemption is not allowed.",
  },
  {
    q: "Is KYC mandatory?",
    a: "Yes. KYC is compulsory before enrollment. It can be completed quickly and digitally through the Unnati App.",
  },
  {
    q: "How do I make monthly payments?",
    a: "Payments are made digitally through UPI or the payment gateway on the Unnati App. No offline cash payment option.",
  },
];

const APP_FEATURES = [
  "Pay installments via UPI",
  "Live scheme progress tracking",
  "Download digital receipts",
  "Transparent ledger view",
  "Manage multiple schemes",
  "Timely payment reminders",
];

/* ─── FAQ Item component ─────────────────────────────────── */
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq__item${open ? " open" : ""}`}>
      <button className="faq__q" onClick={() => setOpen((o) => !o)}>
        <span className="faq__q-text">{q}</span>
        <span className="faq__chevron">
          <ChevronIcon />
        </span>
      </button>
      <div className={`faq__a${open ? " open" : ""}`}>
        <div className="faq__a-inner">{a}</div>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────── */
export default function SuvarnaScheme() {
  const [tcOpen, setTcOpen] = useState(false);

  return (
    <div className="sp">
      {/* ════════════════════════════════════
          HERO
          ════════════════════════════════════ */}
      <section className="hero" id="hero-id">
        <div className="hero__ring hero__ring--a" />
        <div className="hero__ring hero__ring--b" />
        <div className="hero__ring hero__ring--c" />
        <div className="sp-wrap" style={{ width: "100%" }}>
          <div className="hero__inner">
            {/* Left */}
            <div>
              <div className="hero__eye">
                <div className="hero__eye-line" />
                <span className="hero__eye-text">
                  Unnati Jewellers · Bhavnagar
                </span>
              </div>
              <h2 className="sp-h1">
                Suvarna Unnati Scheme
              </h2>
              <p className="hero__tagline">Apni Bachat, Apna Gehna</p>
              <p className="hero__desc">
                A smart jewellery savings plan designed to help you purchase
                your dream jewellery through affordable monthly installments.
                Choose between Weight Based  or Amount Based Scheme and enjoy
                exclusive benefits on successful completion.
              </p>
              <div className="hero__btns">
                <a
                  href="#app-section"
                  className="sp-btn sp-btn--gold sp-btn--lg"
                  style={{ display: "inline-flex", alignItems: "center" }}
                >
                  <SmartphoneIcon />&nbsp;&nbsp;Download the App
                </a>
                <a
                  href="#scheme-types"
                  className="sp-btn sp-btn--ghost-wt sp-btn--lg"
                >
                  Explore Schemes
                </a>
              </div>
              <div className="hero__trust">
                {[
                  "BIS Hallmarked",
                  "Secure Digital Records",
                  "30+ Years Trust",
                  "Live Tracking",
                ].map((t) => (
                  <div key={t} className="hero__trust-item">
                    <div className="hero__trust-dot" />
                    <span className="hero__trust-txt">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: QR card */}
            <div className="hero__qr">
              <div className="hero__qr-lbl">Scan to Download Unnati App</div>
              <div className="hero__qr-box">
                <QRCodeSVG />
              </div>
              <p className="hero__qr-sub">
                Point your phone camera at the code
                <br />
                to download the Unnati App
              </p>
              <div className="hero__store-btns">
                <a
                  href="https://play.google.com/store/apps/details?id=com.unnati.jewellers&hl=en_IN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero__store-btn"
                >
                  <span className="hero__store-btn-icon">
                    <PlayStoreIcon />
                  </span>
                  <div>
                    <span className="hero__store-btn-sub">GET IT ON</span>
                    <strong>Google Play</strong>
                  </div>
                </a>
                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero__store-btn"
                >
                  <span className="hero__store-btn-icon">
                    <AppleIcon />
                  </span>
                  <div>
                    <span className="hero__store-btn-sub">Download on the</span>
                    <strong>App Store</strong>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          ABOUT
          ════════════════════════════════════ */}
      <section className="sp-sec sp-sec--wt">
        <div className="sp-wrap">
          <div className="about__inner">
            <div className="about__img-wrap">
              <div className="about__frame">
                <img
                  src={schemeImg}
                  alt="Suvarna Unnati Scheme"
                  className="about__img"
                />
              </div>
              <div className="about__badge">
                <div className="about__badge-num">30+</div>
                <div className="about__badge-text">Years of Trust</div>
              </div>
            </div>
            <div className="about__content">
              <div className="sp-eyebrow">About the Scheme</div>
              <h2 className="sp-h2" style={{ marginBottom: 14 }}>
                Suvarna Unnati Scheme
              </h2>
              <div className="sp-divider" style={{ marginBottom: 22 }} />
              <p className="sp-body sp-body--lg" style={{ marginBottom: 14 }}>
                The Suvarna Unnati Scheme is designed to make jewellery
                purchases easier, more disciplined, and more rewarding. Instead
                of a large one-time purchase, you save a fixed amount every
                month and gradually build your jewellery purchase value.
              </p>
              <p className="sp-body" style={{ marginBottom: 14 }}>
                Whether you prefer accumulating gold or saving money for your
                future jewellery purchase, Suvarna Unnati provides flexible
                options to suit your financial goals.
              </p>
              <p className="sp-body">
                With complete transparency, secure digital records, timely
                reminders, and dedicated customer support — the scheme ensures a
                smooth and worry-free experience.
              </p>
              <div className="about__tags">
                {[
                  "KYC Verified",

                  "No Hidden Charges",
                  "Live Tracking",
                  "Secure App",
                ].map((t) => (
                  <span key={t} className="about__tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          WHY CHOOSE
          ════════════════════════════════════ */}
      <section className="sp-sec sp-sec--nt">
        <div className="sp-wrap">
          <div className="sp-sec-hdr sp-sec-hdr--ctr">
            <div className="sp-eyebrow">Why Choose Us</div>
            <h2 className="sp-h2">Why Choose Suvarna Unnati?</h2>
            <div className="sp-divider sp-divider--ctr" />
          </div>
          <div className="benefits__grid">
            {BENEFITS.map((b) => (
              <div key={b.title} className="benefit-card">
                <div className="benefit-card__icon">{b.icon}</div>
                <div className="benefit-card__title">{b.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SCHEME TYPES
          ════════════════════════════════════ */}
      <section id="scheme-types" className="sp-sec sp-sec--bg">
        <div className="sp-wrap">
          <div className="sp-sec-hdr sp-sec-hdr--ctr">
            <div className="sp-eyebrow">Scheme Options</div>
            <h2 className="sp-h2">Choose Your Scheme</h2>
            <div className="sp-divider sp-divider--ctr" />
          </div>
          <div className="scheme-cards">
            {/* Weight Based  */}
            <div className="scheme-card scheme-card--gold">
              <div className="sc-header">
                <div className="sc-pill" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <StarIcon /> Weight Based
                </div>
                <span className="sc-icon">
                  <GemIcon />
                </span>
                <h3 className="sc-title">Weight Based  Scheme</h3>
                <p className="sc-desc">
                  Every monthly installment is converted into gold at the
                  applicable gold rate on the payment date. Your accumulated
                  gold is redeemed against jewellery at maturity.
                </p>
                <p className="sc-suitable">
                  ✦ Ideal for those who want to build gold over time
                </p>
                <p className="sc-suitable">
                  ✦ Cash cannot be redeemed, and Boolean cannot be purchased.
                </p>
              </div>
              <div className="sc-details">
                {[
                  {
                    icon: <GemIcon />,
                    text: (
                      <>
                        <strong>Accumulates gold</strong> at today's rate every
                        month
                      </>
                    ),
                  },
                  {
                    icon: <TrendingUpIcon />,
                    text: (
                      <>
                        <strong>Benefit from gold appreciation</strong> over
                        time
                      </>
                    ),
                  },
                  {
                    icon: <ShoppingBagIcon />,
                    text: (
                      <>
                        <strong>Redeem against jewellery</strong> at scheme
                        maturity
                      </>
                    ),
                  },
                  {
                    icon: <AlertTriangleIcon />,
                    text: (
                      <>
                        Cancel: refund minus{" "}
                        <strong>20% of one month's installment</strong>
                      </>
                    ),
                  },
                ].map((d, i) => (
                  <div key={i} className="sc-detail">
                    <span className="sc-detail-icon">{d.icon}</span>
                    <span className="sc-detail-text">{d.text}</span>
                  </div>
                ))}
              </div>
              <div className="sc-bar">
                <span className="sc-bar-icon">
                  <AwardIcon />
                </span>
                <span className="sc-bar-text">
                  BIS Hallmarked · 22K / 18K Gold available
                </span>
              </div>
            </div>

            {/* Amount Based */}
            <div className="scheme-card scheme-card--amount">
              <div className="sc-header">
                <div className="sc-pill" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <BanknoteIcon /> Amount Based
                </div>
                <span className="sc-icon">
                  <BanknoteIcon />
                </span>
                <h3 className="sc-title">Amount Based Scheme</h3>
                <p className="sc-desc">
                  Your monthly installments remain as money throughout the
                  tenure. At maturity, the full accumulated amount is redeemed
                  against jewellery at Unnati Jewellers.
                </p>
                <p className="sc-suitable">
                  ✦ Ideal for those who prefer fixed monthly savings
                </p>
                <p className="sc-suitable">
                  ✦ Cash cannot be redeemed, and Boolean cannot be purchased.
                </p>
              </div>
              <div className="sc-details">
                {[
                  {
                    icon: <BanknoteIcon />,
                    text: (
                      <>
                        <strong>Fixed savings</strong> — installments retained
                        as currency
                      </>
                    ),
                  },
                  {
                    icon: <CalendarIcon />,
                    text: (
                      <>
                        <strong>Predictable</strong> — no market dependency
                      </>
                    ),
                  },
                  {
                    icon: <ShoppingBagIcon />,
                    text: (
                      <>
                        <strong>Full amount redeemable</strong> against
                        jewellery at maturity
                      </>
                    ),
                  },
                  {
                    icon: <CheckCircleIcon />,
                    text: (
                      <>
                        Cancel: <strong>100% refund</strong> of all deposited
                        installments
                      </>
                    ),
                  },
                ].map((d, i) => (
                  <div key={i} className="sc-detail">
                    <span className="sc-detail-icon">{d.icon}</span>
                    <span className="sc-detail-text">{d.text}</span>
                  </div>
                ))}
              </div>
              <div className="sc-bar">
                <span className="sc-bar-icon">
                  <LockIcon />
                </span>
                <span className="sc-bar-text">
                  Secure · Transparent Ledger · Digital Receipts
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          HOW IT WORKS
          ════════════════════════════════════ */}
      <section className="sp-sec sp-sec--wt">
        <div className="sp-wrap">
          <div className="sp-sec-hdr sp-sec-hdr--ctr">
            <div className="sp-eyebrow">Step by Step</div>
            <h2 className="sp-h2">How It Works</h2>
            <div className="sp-divider sp-divider--ctr" />
          </div>
          <div className="steps__grid">
            {STEPS.map((s, i) => (
              <div key={s.title} className="step-item">
                <div className="step-item__num-wrap">
                  <span className="step-item__emoji">{s.emoji}</span>
                </div>
                <div className="step-item__title">
                  <span
                    style={{
                      color: "var(--gold)",
                      fontFamily: "var(--font-b)",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      marginRight: 6,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </div>
                <div className="step-item__desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          PAYMENT TABLE + ELIGIBILITY
          ════════════════════════════════════ */}
      <section className="sp-sec sp-sec--nt">
        <div className="sp-wrap">
          <div className="sp-sec-hdr">
            <div className="sp-eyebrow">Scheme Details</div>
            <h2 className="sp-h2">Payment &amp; Maturity Details</h2>
            <div className="sp-divider" />
          </div>
          <div className="details__grid">
            <div className="sp-table-wrap">
              <table className="sp-table">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map((r) => (
                    <tr key={r.label} className={r.hl ? "row--hl" : ""}>
                      <td>{r.label}</td>
                      <td>{r.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="elig-card">
              <div className="elig-card__title">
                Eligibility &amp; Key Rules
              </div>
              <ul className="elig-list">
                {ELIGIBILITY.map((item) => (
                  <li key={item}>
                    <span className="elig-list__icon">
                      <CheckIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          COMPANY CONTRIBUTION
          ════════════════════════════════════ */}
      <section className="sp-sec sp-sec--wt">
        <div className="sp-wrap">
          <div className="contrib__inner">
            <div className="contrib__visual">
              <div className="contrib__card contrib__card--back">
                <p
                  style={{
                    fontFamily: "var(--font-h)",
                    fontSize: "1rem",
                    color: "var(--primary)",
                    opacity: 0.65,
                    lineHeight: 1.5,
                  }}
                >
                  Complete your scheme &amp; unlock exclusive benefits
                </p>
              </div>
              <div className="contrib__card contrib__card--front">
                <div className="cc-eyebrow">Company Contribution</div>
                <div className="cc-title">Exclusive Completion Bonus</div>
                <div className="cc-desc">
                  Successfully complete your Suvarna Unnati Scheme and Unnati
                  Jewellers rewards you with exclusive benefits as per the
                  applicable scheme terms.
                </div>
                <span className="cc-emoji">
                  <GiftIcon />
                </span>
              </div>
            </div>
            <div className="contrib__content">
              <div className="sp-eyebrow">Bonus Benefit</div>
              <h2 className="sp-h2" style={{ marginBottom: 14 }}>
                Company Contribution
              </h2>
              <div className="sp-divider" style={{ marginBottom: 22 }} />
              <p className="sp-body" style={{ marginBottom: 14 }}>
                At Unnati Jewellers, we believe in rewarding our loyal
                customers. Upon successful completion of your Suvarna Unnati
                Scheme, we offer exclusive benefits as per the applicable scheme
                terms and conditions.
              </p>
              <p className="sp-body">
                This contribution makes your jewellery purchase even more
                rewarding — because we believe that when our customers grow, we
                grow with them.
              </p>
              <div className="contrib__note">
                The exact contribution amount and terms are detailed in the
                scheme-specific Terms &amp; Conditions available on the Unnati
                App and website.
              </div>
              <a
                href="#hero-id"
                className="sp-btn sp-btn--primary"
                style={{ marginTop: 26, display: "inline-flex", alignItems: "center" }}
              >
                <SmartphoneIcon />&nbsp;&nbsp;Join &amp; Start Saving
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FAQ
          ════════════════════════════════════ */}
      <section className="sp-sec sp-sec--nt" id="faq">
        <div className="sp-wrap">
          <div className="sp-sec-hdr sp-sec-hdr--ctr">
            <div className="sp-eyebrow">FAQs</div>
            <h2 className="sp-h2">Frequently Asked Questions</h2>
            <div className="sp-divider sp-divider--ctr" />
          </div>
          <div className="faq__list">
            {FAQS.map((f) => (
              <FAQItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          BROCHURE + T&C
          ════════════════════════════════════ */}
      <section className="sp-sec sp-sec--wt">
        <div className="sp-wrap">
          <div className="sp-sec-hdr sp-sec-hdr--ctr">
            <div className="sp-eyebrow">Documents</div>
            <h2
              className="sp-h2"
              style={{ fontSize: "clamp(1.5rem,3.5vw,2.2rem)" }}
            >
              Know Every Detail Before You Join
            </h2>
          </div>
          <div className="docs__grid">
            <div className="doc-card doc-card--dark">
              <div className="doc-card__deco" />
              <div className="doc-card__icon">
                <FileTextIcon />
              </div>
              <div className="doc-card__title">Download Scheme Brochure</div>
              <div className="doc-card__desc">
                Download the complete brochure to understand all benefits,
                rules, eligibility, payment process, and redemption details
                before you enrol.
              </div>
              <a
                href={brochurePdf}
                download="Suvarna Unnati Scheme Brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="sp-btn sp-btn--gold"
                style={{ alignSelf: "flex-start", marginTop: 8 }}
              >
                <DownloadIcon />
                &nbsp; DOWNLOAD BROCHURE
              </a>
            </div>
            <div className="doc-card doc-card--light">
              <div className="doc-card__deco" />
              <div className="doc-card__icon">
                <FileTextIcon />
              </div>
              <div className="doc-card__title">Terms &amp; Conditions</div>
              <div className="doc-card__desc">
                Please read the complete Terms &amp; Conditions carefully before
                enrolling. All scheme rules, cancellation policies, and
                redemption terms are detailed here.
              </div>
              <button
                onClick={() => setTcOpen(true)}
                className="sp-btn sp-btn--outline"
                style={{ alignSelf: "flex-start", marginTop: 8 }}
              >
                READ FULL T&amp;C &nbsp;
                <LinkIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          APP DOWNLOAD
          ════════════════════════════════════ */}
      <section id="app-section" className="sp-sec sp-sec--pr">
        <div className="sp-wrap">
          <div className="app__inner">
            <div className="app__content">
              <div className="sp-eyebrow sp-eyebrow--lt">Mobile App</div>
              <h2 className="sp-h2 sp-h2--wt">
                Manage Your Scheme
                <br />
                Anytime, Anywhere
              </h2>
              <p className="app__desc">
                Join the Suvarna Unnati Scheme, pay installments, track your
                progress, download receipts, and manage everything securely from
                the Unnati Mobile App.
              </p>
              <div className="app__store-btns">
                <a
                  href="https://play.google.com/store/apps/details?id=com.unnati.jewellers&hl=en_IN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="app__store-btn"
                >
                  <span className="app__store-icon">
                    <PlayStoreIcon />
                  </span>
                  <div>
                    <span className="app__store-sub">GET IT ON</span>
                    <span className="app__store-name">Google Play</span>
                  </div>
                </a>
                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="app__store-btn"
                >
                  <span className="app__store-icon">
                    <AppleIcon />
                  </span>
                  <div>
                    <span className="app__store-sub">Download on the</span>
                    <span className="app__store-name">App Store</span>
                  </div>
                </a>
              </div>
              <div className="app__features">
                {APP_FEATURES.map((f) => (
                  <div key={f} className="app__feature">
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="app__phone-block">
              <div className="app__phone">
                <div className="app__phone-screen">
                  <div className="app__phone-logo">
                    <GemIcon />
                  </div>
                  <div className="app__phone-title">Unnati App</div>
                  <div className="app__phone-sub">Suvarna Unnati Scheme</div>
                  <div className="app__phone-bar" />
                </div>
              </div>
              <div className="app__qr-row">
                <div className="app__qr-img">
                  <QRCodeSVG />
                </div>
                <div className="app__qr-caption">
                  <strong style={{ color: "#fff" }}>Scan to Download</strong>
                  <br />
                  Point your phone camera at the QR
                  <br />
                  code to get the Unnati App
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          ASSISTANCE
          ════════════════════════════════════ */}
      <section className="sp-sec sp-sec--bg">
        <div className="sp-wrap">
          <div className="assist__inner">
            <div className="sp-eyebrow" style={{ justifyContent: "center" }}>
              Need Help?
            </div>
            <h2 className="sp-h2" style={{ marginBottom: 12 }}>
              We're Here to Help
            </h2>
            <p className="assist__desc">
              If you have any questions regarding the Suvarna Unnati Scheme, our
              team will be happy to assist you in person, over the phone, or via
              WhatsApp.
            </p>
            <div className="assist__cards">
              <a href="tel:+916351630432" className="assist-card">
                <span className="assist-card__icon">
                  <PhoneIcon />
                </span>
                <div className="assist-card__title">Call Us</div>
                <div className="assist-card__sub">+91 63516 30432</div>
              </a>
              <a
                href="https://wa.me/916351630432"
                target="_blank"
                rel="noopener noreferrer"
                className="assist-card"
              >
                <span className="assist-card__icon">
                  <MessageSquareIcon />
                </span>
                <div className="assist-card__title">WhatsApp Us</div>
                <div className="assist-card__sub">
                  Quick replies · 9 AM – 8 PM
                </div>
              </a>
              <Link to="/book-appointment" className="assist-card">
                <span className="assist-card__icon">
                  <CalendarIcon />
                </span>
                <div className="assist-card__title">Book Appointment</div>
                <div className="assist-card__sub">Meet our scheme advisors</div>
              </Link>
              <a
                href="https://maps.app.goo.gl/PHcfa6pZ8kJzR2NS9"
                target="_blank"
                rel="noopener noreferrer"
                className="assist-card"
              >
                <span className="assist-card__icon">
                  <StoreIcon />
                </span>
                <div className="assist-card__title">Visit Showroom</div>
                <div className="assist-card__sub">
                  Waghavadi Road, Bhavnagar
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Terms & Conditions Modal Overlay ─── */}
      {tcOpen && (
        <div className="tc-overlay" onClick={() => setTcOpen(false)}>
          <div className="tc-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tc-header">
              <div className="tc-title-wrap">
                <h3>Suvarna Unnati Scheme</h3>
                <span className="tc-subtitle">Terms &amp; Conditions (v1.0)</span>
              </div>
              <button className="tc-close-btn" onClick={() => setTcOpen(false)} aria-label="Close modal">
                &times;
              </button>
            </div>

            <div className="tc-body">
              <div className="tc-section">
                <h4>1. Introduction</h4>
                <p>The Suvarna Unnati Scheme (“Scheme”) is a customer savings and purchase facilitation program operated by Unnati Jewellers (“Company”) for the future purchase of eligible jewellery products from the Company.</p>
                <p>Participation in the Scheme constitutes acceptance of these Terms &amp; Conditions.</p>
              </div>

              <div className="tc-section">
                <h4>2. Eligibility</h4>
                <p>Participation in the Scheme is available to individuals who:</p>
                <ul>
                  <li>Are legally competent to enter into contracts.</li>
                  <li>Provide accurate registration information.</li>
                  <li>Complete any required customer verification procedures.</li>
                  <li>Agree to all Scheme Terms &amp; Conditions.</li>
                </ul>
                <p>The Company reserves the right to refuse or terminate participation where required by law or company policy.</p>
              </div>

              <div className="tc-section">
                <h4>3. Scheme Duration</h4>
                <p>The Company may offer one or more Scheme variants, including:</p>
                <ul>
                  <li>11 Month Scheme</li>
                  <li>22 Month Scheme</li>
                </ul>
                <p>The applicable duration shall be displayed at the time of enrollment.</p>
              </div>

              <div className="tc-section">
                <h4>4. Installment Amount</h4>
                <p>The minimum installment amount shall be determined by the Company from time to time.</p>
                <p>Customers may contribute amounts in accordance with the Scheme selected.</p>
                <p>Missed installments may result in extension of the Scheme period subject to Company policy.</p>
              </div>

              <div className="tc-section">
                <h4>5. Payment Methods</h4>
                <p>Payments may be made through:</p>
                <ul>
                  <li>Integrated Payment Gateway</li>
                  <li>Direct Bank Transfer to the designated Company account</li>
                </ul>
                <p>Cash payments shall not be accepted under the Scheme.</p>
                <p>The Company reserves the right to add or remove payment methods at its discretion.</p>
              </div>

              <div className="tc-section">
                <h4>6. Payment Recognition</h4>
                <p>A payment shall be considered valid only when:</p>
                <ul>
                  <li>Successfully processed through the approved payment gateway; or</li>
                  <li>Verified and recorded by an authorized Company representative.</li>
                </ul>
                <p>The Company’s records shall be treated as final for determination of payment status.</p>
              </div>

              <div className="tc-section">
                <h4>7. Receipts</h4>
                <p>Electronic receipts shall be generated for eligible payments.</p>
                <p>Customers may download receipts through the application.</p>
                <p>Receipt availability and retention shall be subject to Company policies and technical limitations.</p>
              </div>

              <div className="tc-section">
                <h4>8. Customer Responsibilities</h4>
                <p>Customers agree to:</p>
                <ul>
                  <li>Provide accurate information.</li>
                  <li>Maintain updated contact details.</li>
                  <li>Protect login credentials.</li>
                  <li>Review receipts and payment history regularly.</li>
                  <li>Notify the Company of any discrepancies promptly.</li>
                </ul>
              </div>

              <div className="tc-section">
                <h4>9. Scheme Benefits</h4>
                <p>Upon successful completion of the Scheme and fulfillment of all applicable requirements, the Company may provide benefits as specified under the selected Scheme plan.</p>
                <p>Benefits shall be governed solely by the Scheme rules applicable at the time of enrollment.</p>
              </div>

              <div className="tc-section">
                <h4>10. Redemption</h4>
                <p>Scheme balances and benefits may only be redeemed against eligible purchases from Unnati Jewellers.</p>
                <p>Redemption:</p>
                <ul>
                  <li>Cannot be exchanged for cash.</li>
                  <li>Cannot be transferred except where permitted by Company policy.</li>
                  <li>Shall be subject to applicable taxes and charges.</li>
                </ul>
              </div>

              <div className="tc-section">
                <h4>11. Nomination</h4>
                <p>The Company may permit customers to nominate a beneficiary.</p>
                <p>The Company reserves the right to request supporting documentation before acting upon nominee claims.</p>
              </div>

              <div className="tc-section">
                <h4>12. Cancellation and Closure</h4>
                <p>The Company may suspend, cancel, terminate, or modify the Scheme:</p>
                <ul>
                  <li>To comply with legal requirements.</li>
                  <li>To prevent fraud or misuse.</li>
                  <li>For operational or business reasons.</li>
                </ul>
                <p>Any such action shall be subject to applicable laws and Company policies.</p>
              </div>

              <div className="tc-section">
                <h4>13. Fraud Prevention</h4>
                <p>The Company reserves the right to investigate:</p>
                <ul>
                  <li>Suspicious transactions.</li>
                  <li>False information.</li>
                  <li>Identity misuse.</li>
                  <li>Unauthorized account access.</li>
                </ul>
                <p>The Company may suspend Scheme benefits pending investigation.</p>
              </div>

              <div className="tc-section">
                <h4>14. Limitation of Liability</h4>
                <p>The Company shall not be liable for:</p>
                <ul>
                  <li>Network failures.</li>
                  <li>Banking delays.</li>
                  <li>Payment gateway interruptions.</li>
                  <li>Technical errors beyond reasonable control.</li>
                  <li>Unauthorized access caused by customer negligence.</li>
                </ul>
              </div>

              <div className="tc-section">
                <h4>15. Fund Utilization &amp; Regulatory Compliance</h4>
                <h5 style={{ fontFamily: "var(--font-h)", fontSize: "1.05rem", color: "var(--primary)", marginTop: "12px", marginBottom: "6px" }}>Nature of the Scheme</h5>
                <p>The Scheme is a jewellery purchase savings program.</p>
                <p>The Scheme is not:</p>
                <ul>
                  <li>A deposit scheme.</li>
                  <li>A banking product.</li>
                  <li>A financial product.</li>
                  <li>A mutual fund.</li>
                  <li>A securities offering.</li>
                  <li>A stock market investment.</li>
                  <li>A commodity investment.</li>
                  <li>A digital gold product.</li>
                  <li>A bullion investment product.</li>
                  <li>A cryptocurrency product.</li>
                  <li>A collective investment scheme.</li>
                </ul>
                <p>Participation in the Scheme does not create ownership of gold, silver, bullion, securities, or any financial asset.</p>

                <h5 style={{ fontFamily: "var(--font-h)", fontSize: "1.05rem", color: "var(--primary)", marginTop: "12px", marginBottom: "6px" }}>No Sale of Digital Gold or Bullion</h5>
                <p>Unnati Jewellers does not offer, sell, distribute, or facilitate:</p>
                <ul>
                  <li>Digital Gold</li>
                  <li>Digital Silver</li>
                  <li>Investment Bullion</li>
                  <li>Securities</li>
                  <li>Commodities</li>
                  <li>Financial Assets</li>
                </ul>
                <p>through this Scheme.</p>

                <h5 style={{ fontFamily: "var(--font-h)", fontSize: "1.05rem", color: "var(--primary)", marginTop: "12px", marginBottom: "6px" }}>No Interest or Investment Return</h5>
                <p>No interest, financial return, market-linked return, appreciation guarantee, dividend, profit share, investment income, or speculative gain shall accrue on amounts paid under the Scheme.</p>

                <h5 style={{ fontFamily: "var(--font-h)", fontSize: "1.05rem", color: "var(--primary)", marginTop: "12px", marginBottom: "6px" }}>Customer Funds</h5>
                <p>Amounts received under the Scheme form part of the Company’s business operations and are managed by the Company in accordance with applicable laws and internal policies.</p>
                <p>The Company does not represent that Scheme payments are individually allocated to any specific quantity of gold, silver, bullion, securities, shares, commodities, or financial assets.</p>
              </div>

              <div className="tc-section">
                <h4>16. Customer Declaration</h4>
                <p>By enrolling in the Scheme, the customer acknowledges and agrees that:</p>
                <ul>
                  <li>The Scheme is a jewellery purchase savings program.</li>
                  <li>The Scheme is not an investment product.</li>
                  <li>The Scheme is not Digital Gold.</li>
                  <li>The Scheme does not provide interest or investment returns.</li>
                  <li>The customer has read and accepted these Terms &amp; Conditions.</li>
                </ul>
              </div>

              <div className="tc-section">
                <h4>17. Amendments</h4>
                <p>The Company reserves the right to amend these Terms &amp; Conditions at any time.</p>
                <p>Updated Terms shall become effective upon publication through the Company’s website, application, or other official communication channels.</p>
              </div>

              <div className="tc-section">
                <h4>18. Governing Law</h4>
                <p>These Terms &amp; Conditions shall be governed by the laws of India.</p>
                <p>Any disputes shall be subject to the exclusive jurisdiction of the competent courts having jurisdiction over the Company’s principal place of business.</p>
              </div>
            </div>

            <div className="tc-footer">
              <button className="sp-btn sp-btn--primary" onClick={() => setTcOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
