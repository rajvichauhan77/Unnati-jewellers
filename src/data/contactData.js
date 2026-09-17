// ── Contact Page Data ──────────────────────────────────────────────
// Replace this with an API call later — component shape stays the same.
// e.g. const data = await fetch('/api/contact-info').then(r => r.json());

import showroomImg from "../assets/images/store.png";

export const shopAddresses = [
  {
    id: 1,
    label: "Flagship Address",
    line1: "GROUND FLOOR, SHOP NO.2, SHANTI SKY, WAGHAVADI ROAD,",
    line2: "PARIMAL CHOWK, Bhavnagar, Gujarat, 364001",
  }
];

export const showroomHours = {
  weekdays: "Mon – Sat: 10:00 AM – 08:00 PM",
  sunday: "Sunday: By Appointment Only",
};

export const showroomImage = {
  src: showroomImg,
  pinLabel: "",
};

export const mapEmbedUrl =
  "https://www.google.com/maps?q=Unnati+Jewellers+Parimal+Chowk+Bhavnagar&output=embed";

export const directionsUrl =
  "https://maps.app.goo.gl/PHcfa6pZ8kJzR2NS9";

// ── Contact Info Cards ────────────────────────────────────────────
export const contactCards = [
  {
    id: "call",
    icon: "phone",
    label: "General Support",
    value: "+91 6351630432",
    href: "tel:+916351630432",
  },
  {
    id: "whatsapp",
    icon: "whatsapp",
    label: "WhatsApp Support",
    value: "+91 6351630432",
    href: "https://wa.me/916351630432",
  },
  {
    id: "email-support",
    icon: "mail",
    label: "Email for Support",
    value: "support@unnatijewellers.com",
    href: "mailto:support@unnatijewellers.com",
  },
  {
    id: "email-general",
    icon: "mail",
    label: "General Email",
    value: "unnatijewellers.official@gmail.com",
    href: "mailto:unnatijewellers.official@gmail.com",
  },
  {
    id: "visit",
    icon: "pin",
    label: "Visit Us",
    value: "GROUND FLOOR, SHOP NO.2, SHANTI SKY, WAGHAVADI ROAD, PARIMAL CHOWK, Bhavnagar, Gujarat, 364001",
    href: directionsUrl,
  },
];

// ── The Unnati Experience ─────────────────────────────────────────
export const experienceFeatures = [
  {
    id: 1,
    icon: "consultation",
    title: "Personalized Consultation",
    desc: "One-on-one sessions to understand your style, budget, and dreams.",
  },
  {
    id: 2,
    icon: "star",
    title: "Bridal Experts",
    desc: "Specialized designers focused exclusively on wedding and bridal trousseaus.",
  },
  {
    id: 3,
    icon: "badge",
    title: "BIS Hallmarked",
    desc: "Every gram of gold and every carat of diamond is strictly certified for purity.",
  },
  {
    id: 4,
    icon: "receipt",
    title: "Transparent Pricing",
    desc: "No hidden costs. Detailed breakups of gold weight, stones, and making charges.",
  },
  {
    id: 5,
    icon: "design",
    title: "Custom Design",
    desc: "Turn your imagination into reality with our 3D design and bespoke carving.",
  },
  {
    id: 6,
    icon: "history",
    title: "Trusted Since 1992",
    desc: "Over three decades of legacy in crafting trust and timeless jewelry.",
  },
];

// ── FAQ ────────────────────────────────────────────────────────────
export const faqs = [
  {
    id: 1,
    question: "Do I need an appointment to visit?",
    answer:
      "Walk-ins are always welcome at our showroom. However, we recommend booking an appointment for bridal consultations or custom design sessions so our specialists can give you their undivided attention.",
  },
  {
    id: 2,
    question: "Can you customize jewelry from a photo?",
    answer:
      "Yes. Share a reference photo with our design team and we'll create a 3D rendering of the piece before crafting it, so you can review every detail beforehand.",
  },
  {
    id: 3,
    question: "What is your gold exchange policy?",
    answer:
      "We offer transparent gold exchange at the prevailing market rate, with no hidden deductions. Bring your old gold for a free valuation at any of our stores.",
  },
  {
    id: 4,
    question: "Is your gold BIS Hallmarked?",
    answer:
      "Every piece of gold and diamond jewelry we sell is BIS Hallmarked and certified for purity, so you can purchase with complete confidence.",
  },
  {
    id: 5,
    question: "Do you offer the Suvarna Unnati Scheme at this store?",
    answer:
      "Yes, the Suvarna Unnati Scheme is available at all our showrooms. Visit us or call to enrol and start your flexible monthly savings plan today.",
  },
  {
    id: 6,
    question: "Do you provide jewelry certification certificates?",
    answer:
      "Yes, all our diamond and gemstone jewelry comes with certification from internationally recognized laboratories, certifying the color, clarity, cut, and carat weight.",
  },
  {
    id: 7,
    question: "Do you offer secure shipping or home delivery?",
    answer:
      "Yes, we offer secure, fully insured shipping for purchases across India. Additionally, you can choose to reserve items online and pick them up at our showroom.",
  },
];
