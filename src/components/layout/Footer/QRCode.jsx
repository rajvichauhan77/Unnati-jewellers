// ─── QRCode Component ─────────────────────────────────────
// Uses react-qr-code to generate a real, scannable QR code for the mobile app.

import QRCode from "react-qr-code";

const DEFAULT_APP_LINK = "https://play.google.com/store/apps/details?id=com.unnati.jewellers&hl=en_IN";

const UnnatiQRCode = ({
  value = DEFAULT_APP_LINK,
  size = 110,
  fgColor = "#D4AF37",
  bgColor = "#810B38",
}) => {
  return (
    <div style={{ padding: "4px", background: bgColor, borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <QRCode
        value={value}
        size={size}
        fgColor={fgColor}
        bgColor={bgColor}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        viewBox="0 0 256 256"
      />
    </div>
  );
};

export default UnnatiQRCode;
