import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import UnnatiHeader from "./components/layout/UnnatiHeader";
import Home from "./pages/Home";
import About from "./pages/About";
import Collections from "./pages/Collections";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import SuvarnaScheme from "./pages/SuvarnaScheme";
import Contact from "./pages/Contact";
import BookAppointment from "./pages/BookAppointment";
import GoldRate from "./pages/GoldRate";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Footer from "./components/layout/Footer";
import Maintenance from "./pages/Maintenance";
import { fetchMaintenanceStatus } from "./services/maintenanceService";
import loaderIconImg from "./assets/temp/favicon.webp";
import "./styles/global.css";

// Helper component to handle scrolling to section hash or page top on route transition
function ScrollToHashElement() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

const seoData = {
  "/": {
    title: "Unnati - Home",
    description: "Welcome to Unnati Jewellers. Discover our exquisite collection of premium gold, silver, diamond, platinum, and bridal jewellery designed for elegance.",
    keywords: "Unnati Jewellers, gold jewellery, diamond rings, silver ornaments, platinum bands, bridal collections, Indian jewellery store, fine gold rate"
  },
  "/about": {
    title: "Unnati - About",
    description: "Learn more about Unnati Jewellers, our heritage, our values, and our commitment to providing 100% hallmarked, authentic jewellery of the highest purity.",
    keywords: "about Unnati, jewellery heritage, hallmarked gold, gold purity guarantee, certified diamonds, trusted jeweller, jewellery history"
  },
  "/collections": {
    title: "Unnati - Collections",
    description: "Explore Unnati's curated collections including Heritage Bridal, Royal Polki Kundan, Temple Jewels, Eternal Solitaires, and Station Mangalsutras.",
    keywords: "jewellery collections, bridal jewellery, royal polki, kundan sets, temple jewellery, diamond solitaires, gold mangalsutra, luxury ornaments"
  },
  "/collections/products": {
    title: "Unnati - Products",
    description: "Browse the entire Unnati catalogue. Filter by metal type, purity, stone type, occasion, or gender to find the perfect piece of jewellery.",
    keywords: "buy gold online, diamond rings, silver anklets, platinum wedding bands, gold necklaces, traditional bangles, kids jewellery, daily wear jewellery"
  },
  "/suvarna-scheme": {
    title: "Unnati - Suvarna Scheme",
    description: "Join Unnati's Suvarna Scheme. Save monthly to acquire beautiful gold jewellery with exclusive benefits and bonus contributions.",
    keywords: "Suvarna Scheme, gold scheme, monthly savings plan, gold investment, jewellery saving scheme, gold accumulation, Unnati schemes"
  },
  "/contact": {
    title: "Unnati - Contact",
    description: "Get in touch with Unnati Jewellers. Find our store addresses, phone numbers, email, or send us an inquiry directly.",
    keywords: "contact Unnati, store address, phone number, customer support, query, branch locations, email address"
  },
  "/book-appointment": {
    title: "Unnati - Book Appointment",
    description: "Schedule a personalized virtual or in-store consultation with our jewellery design experts at Unnati Jewellers.",
    keywords: "book appointment, virtual shopping, showroom visit, private viewing, jewellery consultation, design consultation"
  },
  "/gold-rate": {
    title: "Unnati - Gold Rate",
    description: "Check live 22 Karat and 24 Karat gold rates. Stay updated with current gold market pricing in real-time.",
    keywords: "live gold rate, gold price today, 22k gold rate, 24k gold rate, silver rate today, gold market price, live pricing"
  },
  "/privacy-policy": {
    title: "Unnati - Privacy Policy",
    description: "Read the official Privacy Policy of Unnati Jewellers. Learn how we collect, use, store, and protect your personal information.",
    keywords: "privacy policy, Unnati Jewellers privacy, data protection, privacy terms"
  },
  "/terms-conditions": {
    title: "Unnati - Terms & Conditions",
    description: "Read the official Terms & Conditions for Unnati Jewellers website and services.",
    keywords: "terms and conditions, Unnati terms, website terms, legal policy"
  },
  "/terms-and-conditions": {
    title: "Unnati - Terms & Conditions",
    description: "Read the official Terms & Conditions for Unnati Jewellers website and services.",
    keywords: "terms and conditions, Unnati terms, website terms, legal policy"
  }
};

function SEOHandler() {
  const { pathname } = useLocation();

  useEffect(() => {
    let currentSEO = seoData[pathname];

    if (!currentSEO && pathname.startsWith("/product/")) {
      const slug = pathname.substring(9);
      const name = slug
        ? slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        : "";
      currentSEO = {
        title: name ? `Unnati - ${name}` : "Unnati - Product Detail",
        description: `Explore the exquisite ${name || "product"} at Unnati. Certified purity, timeless design, and premium craftsmanship.`,
        keywords: `${name ? name + ", " : ""}buy online, luxury jewellery, gold rate, certified diamond, Unnati product`
      };
    }

    if (!currentSEO && (pathname.startsWith("/category/") || pathname.startsWith("/subcategory/") || pathname.startsWith("/collection/"))) {
      const segments = pathname.split("/");
      const slugIndex = segments.indexOf("category") !== -1 ? segments.indexOf("category") + 1 : 
                        segments.indexOf("subcategory") !== -1 ? segments.indexOf("subcategory") + 1 :
                        segments.indexOf("collection") !== -1 ? segments.indexOf("collection") + 1 : -1;
      
      const slug = slugIndex !== -1 ? segments[slugIndex] : "";
      const name = slug
        ? slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        : "";
      currentSEO = {
        title: name ? `Unnati - ${name} Products` : "Unnati - Products",
        description: `Explore the exquisite ${name || "products"} collection at Unnati. Purity and premium craftsmanship.`,
        keywords: `${name ? name + ", " : ""}buy online, luxury jewellery, gold rate, certified diamond, Unnati product`
      };
    }

    if (!currentSEO) {
      currentSEO = {
        title: "Unnati | Exquisite Gold, Silver, & Diamond Jewellery",
        description: "Discover our exquisite collection of premium gold, silver, diamond, platinum, and bridal jewellery designed for elegance at Unnati.",
        keywords: "Unnati Jewellers, gold jewellery, diamond rings, silver ornaments, platinum bands, bridal collections, Indian jewellery store"
      };
    }

    // Set Document Title
    document.title = currentSEO.title;

    // Set or Create Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = currentSEO.description;

    // Set or Create Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = currentSEO.keywords;
  }, [pathname]);

  return null;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [underMaintenance, setUnderMaintenance] = useState(false);

  const checkMaintenance = async () => {
    const status = await fetchMaintenanceStatus();
    setUnderMaintenance(status);
  };

  useEffect(() => {
    checkMaintenance();
    const interval = setInterval(checkMaintenance, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      const cleanupTimer = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(cleanupTimer);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (underMaintenance) {
    return <Maintenance onCheckStatus={checkMaintenance} />;
  }

  return (
    <>
      {loading && (
        <div id="pre-load" className={fadeOut ? "fade-out" : ""}>
          <div id="loader" className="loader">
            <div className="loader-container has-theme-red">
              <div className="loader-icon">
                <img src={loaderIconImg} alt="Loading Unnati Jewellers" />
              </div>
            </div>
          </div>
        </div>
      )}

      <Router>
        <SEOHandler />
        <ScrollToHashElement />
        <UnnatiHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/products" element={<Products />} />
          <Route path="/category/:categorySlug/products" element={<Products />} />
          <Route path="/subcategory/:subcategorySlug/products" element={<Products />} />
          <Route path="/collection/:collectionSlug/products" element={<Products />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/suvarna-scheme" element={<SuvarnaScheme />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/gold-rate" element={<GoldRate />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
