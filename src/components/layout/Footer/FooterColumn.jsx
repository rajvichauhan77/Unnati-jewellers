// ─── FooterColumn Component ───────────────────────────────
// Reusable column: title + list of links
import { Link } from "react-router-dom";

const FooterColumn = ({ title, links }) => {
  const getHref = (label, href) => {
    if (href && href !== "#") return href;
    const lowerLabel = label.toLowerCase();
    const lowerTitle = title.toLowerCase();

    // Map based on title or label to target routes
    // if (
    //   lowerTitle === "about" ||
    //   lowerLabel.includes("foundation") ||
    //   lowerLabel.includes("protocol") ||
    //   lowerLabel.includes("mondset") ||
    //   lowerLabel === "about"
    // ) {
    //   return "/about";
    // }

    // if(  lowerLabel === "journy"){
    //   return "/about#journy"
    // }

    if (
      lowerTitle === "explore" ||
      lowerLabel === "collections" ||
      lowerLabel === "bridal"
    ) {
      return "/collections";
    }
    if (lowerLabel === "trending collection") {
      return "/#trending-now";
    }
    if (lowerLabel === "suvarna unnati") {
      return "/suvarna-scheme";
    }
    if (lowerLabel === "book consultation") {
      return "/book-appointment";
    }
    if (lowerLabel === "contact us") {
      return "/contact";
    }
    return href || "#";
  };

  return (
    <div className="uj-footer-col">
      <div className="uj-footer-col-title">{title}</div>
      <ul className="uj-footer-links">
        {links.map(({ label, href = "#" }) => {
          const targetHref = getHref(label, href);
          const isInternal = targetHref.startsWith("/");
          
          const handleClick = (e) => {
            const hashIndex = targetHref.indexOf("#");
            if (hashIndex !== -1) {
              const targetHash = targetHref.substring(hashIndex);
              const targetPath = targetHref.substring(0, hashIndex) || "/";
              
              if (window.location.pathname === targetPath) {
                const id = targetHash.replace("#", "");
                const element = document.getElementById(id);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }
            }
          };

          return (
            <li key={label}>
              {isInternal ? (
                <Link to={targetHref} className="uj-footer-link" onClick={handleClick}>
                  {label}
                </Link>
              ) : (
                <a href={targetHref} className="uj-footer-link">
                  {label}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FooterColumn;
